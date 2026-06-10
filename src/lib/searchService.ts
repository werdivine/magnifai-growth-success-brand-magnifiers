import * as cheerio from 'cheerio';

export interface SearchResult {
    title: string;
    link: string;
    snippet: string;
    source: string;
    emails?: string[];
    status?: string;
}

const SEARCH_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate',
    'DNT': '1',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
};

/**
 * Extract the actual URL from a DuckDuckGo redirect link.
 * DDG wraps results in /l/?uddg=<encoded_url> redirects.
 */
function extractDDGLink(rawHref: string): string | null {
    if (!rawHref) return null;

    // Direct URL (starts with http)
    if (rawHref.startsWith('http')) return rawHref;

    // Protocol-relative
    if (rawHref.startsWith('//')) return 'https:' + rawHref;

    // DDG redirect: //duckduckgo.com/l/?uddg=<url>&rut=...
    if (rawHref.includes('uddg=')) {
        try {
            const urlObj = new URL(rawHref.startsWith('/') ? 'https://duckduckgo.com' + rawHref : rawHref);
            const decoded = urlObj.searchParams.get('uddg');
            if (decoded) return decoded;
        } catch {
            // Try manual extraction
            const match = rawHref.match(/uddg=([^&]+)/);
            if (match) return decodeURIComponent(match[1]);
        }
    }

    return null;
}

/**
 * Primary search: DuckDuckGo HTML (no API key required)
 */
async function searchDuckDuckGo(query: string, limit: number): Promise<SearchResult[]> {
    const results: SearchResult[] = [];
    const encodedQuery = encodeURIComponent(query);
    const url = `https://html.duckduckgo.com/html/?q=${encodedQuery}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        const response = await fetch(url, {
            headers: SEARCH_HEADERS,
            signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            console.error(`[SearchService] DuckDuckGo returned status: ${response.status}`);
            return results;
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // DuckDuckGo HTML results use .result class with .result__a for title links
        $('.result').each((i, element) => {
            if (results.length >= limit) return false;

            const titleEl = $(element).find('.result__a');
            const title = titleEl.text().trim();
            const rawHref = titleEl.attr('href') || '';
            const snippet = $(element).find('.result__snippet').text().trim();

            const link = extractDDGLink(rawHref);

            if (title && link && !link.includes('duckduckgo.com')) {
                results.push({
                    title,
                    link,
                    snippet: snippet || 'No description available',
                    source: 'DuckDuckGo',
                });
            }
        });

        console.log(`[SearchService] DuckDuckGo returned ${results.length} results for "${query}"`);
    } catch (error: unknown) {
        clearTimeout(timeoutId);
        const msg = error instanceof Error ? error.message : String(error);
        console.error(`[SearchService] DuckDuckGo search failed: ${msg}`);
    }

    return results;
}

/**
 * Fallback search: Bing web scrape (no API key required)
 */
async function searchBing(query: string, limit: number): Promise<SearchResult[]> {
    const results: SearchResult[] = [];
    const encodedQuery = encodeURIComponent(query);
    const url = `https://www.bing.com/search?q=${encodedQuery}&count=${limit}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        const response = await fetch(url, {
            headers: SEARCH_HEADERS,
            signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            console.error(`[SearchService] Bing returned status: ${response.status}`);
            return results;
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Bing uses <li class="b_algo"> for organic results
        $('li.b_algo').each((i, element) => {
            if (results.length >= limit) return false;

            const titleEl = $(element).find('h2 a');
            const title = titleEl.text().trim();
            const link = titleEl.attr('href') || '';
            const snippet = $(element).find('.b_caption p').text().trim();

            if (title && link && link.startsWith('http')) {
                results.push({
                    title,
                    link,
                    snippet: snippet || 'No description available',
                    source: 'Bing',
                });
            }
        });

        console.log(`[SearchService] Bing returned ${results.length} results for "${query}"`);
    } catch (error: unknown) {
        clearTimeout(timeoutId);
        const msg = error instanceof Error ? error.message : String(error);
        console.error(`[SearchService] Bing search failed: ${msg}`);
    }

    return results;
}

/**
 * Last-resort fallback: Generate intelligent pseudo-results using query analysis.
 * These are constructed from common patterns for business discovery queries.
 * They link to real domain patterns (Google Maps, LinkedIn, Yelp) that would
 * match the user's search intent.
 */
function generateSmartFallbackResults(query: string, limit: number): SearchResult[] {
    const results: SearchResult[] = [];
    const encodedQuery = encodeURIComponent(query);

    // Parse likely niche and location from query
    const parts = query.split(' in ');
    const niche = parts[0] || query;
    const location = parts[1] || '';
    const encodedNiche = encodeURIComponent(niche);
    const encodedLocation = encodeURIComponent(location);

    const templates: SearchResult[] = [
        {
            title: `${niche} — Google Maps Results${location ? ` in ${location}` : ''}`,
            link: `https://www.google.com/maps/search/${encodedQuery}`,
            snippet: `Discover top-rated ${niche.toLowerCase()} businesses${location ? ` in ${location}` : ''}. View reviews, contact info, and directions on Google Maps.`,
            source: 'Google Maps',
        },
        {
            title: `${niche} Companies${location ? ` in ${location}` : ''} | LinkedIn`,
            link: `https://www.linkedin.com/search/results/companies/?keywords=${encodedQuery}`,
            snippet: `Find and connect with ${niche.toLowerCase()} professionals and companies${location ? ` in ${location}` : ''} on LinkedIn. View profiles, services, and contact information.`,
            source: 'LinkedIn',
        },
        {
            title: `Best ${niche}${location ? ` near ${location}` : ''} — Yelp`,
            link: `https://www.yelp.com/search?find_desc=${encodedNiche}&find_loc=${encodedLocation}`,
            snippet: `Top-rated ${niche.toLowerCase()} with reviews, photos, and contact information. Compare pricing and services from verified businesses.`,
            source: 'Yelp',
        },
        {
            title: `${niche}${location ? ` in ${location}` : ''} — Clutch.co`,
            link: `https://clutch.co/search?q=${encodedQuery}`,
            snippet: `Browse verified ${niche.toLowerCase()} agencies with client reviews, project portfolios, and pricing data. Find the perfect partner for your project.`,
            source: 'Clutch',
        },
        {
            title: `${niche} Directory${location ? ` — ${location}` : ''} — Yellow Pages`,
            link: `https://www.yellowpages.com/search?search_terms=${encodedNiche}&geo_location_terms=${encodedLocation}`,
            snippet: `Complete business listings for ${niche.toLowerCase()}${location ? ` in ${location}` : ''}. Phone numbers, addresses, and website links.`,
            source: 'Yellow Pages',
        },
        {
            title: `${niche}${location ? ` ${location}` : ''} | Crunchbase`,
            link: `https://www.crunchbase.com/textsearch?q=${encodedQuery}`,
            snippet: `Discover ${niche.toLowerCase()} companies, their funding, team size, and growth data. Ideal for competitive research and lead prospecting.`,
            source: 'Crunchbase',
        },
        {
            title: `${niche} Services${location ? ` in ${location}` : ''} — G2`,
            link: `https://www.g2.com/search?utf8=%E2%9C%93&query=${encodedNiche}`,
            snippet: `Compare ${niche.toLowerCase()} software and services with real user reviews. Find the best tools and vendors for your business needs.`,
            source: 'G2',
        },
        {
            title: `Top ${niche}${location ? ` in ${location}` : ''} — GoodFirms`,
            link: `https://www.goodfirms.co/search?query=${encodedQuery}`,
            snippet: `Hand-curated list of top ${niche.toLowerCase()} companies with verified reviews and portfolios. Get quotes and compare service providers.`,
            source: 'GoodFirms',
        },
    ];

    return templates.slice(0, limit);
}

/**
 * Main search function with 3-tier fallback strategy:
 * 1. DuckDuckGo HTML scrape (free, no API key)
 * 2. Bing HTML scrape (free, no API key)
 * 3. Smart directory-link generation (always works)
 */
export async function performWebSearch(query: string, limit: number = 10): Promise<SearchResult[]> {
    console.log(`[SearchService] Searching for: "${query}" (limit: ${limit})`);

    // Tier 1: DuckDuckGo
    let results = await searchDuckDuckGo(query, limit);
    if (results.length >= 2) return results;

    // Tier 2: Bing
    console.log('[SearchService] DuckDuckGo insufficient, trying Bing...');
    const bingResults = await searchBing(query, limit);
    results = [...results, ...bingResults];

    // Deduplicate
    const seen = new Set<string>();
    results = results.filter(r => {
        const key = r.link.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    if (results.length >= 2) return results.slice(0, limit);

    // Tier 3: Smart fallback (always returns results)
    console.log('[SearchService] Live search failed, using smart directory fallback...');
    const fallbackResults = generateSmartFallbackResults(query, limit);
    results = [...results, ...fallbackResults];

    // Deduplicate again
    const seen2 = new Set<string>();
    results = results.filter(r => {
        const key = r.link.toLowerCase();
        if (seen2.has(key)) return false;
        seen2.add(key);
        return true;
    });

    return results.slice(0, limit);
}

/**
 * Extract email addresses from a given URL by fetching the page and parsing.
 */
export async function extractEmailsFromUrl(url: string): Promise<string[]> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; WeMagnifAI-LeadBot/1.0; +https://wemagnifai.com)',
            },
        });
        clearTimeout(timeoutId);

        if (!response.ok) return [];

        const html = await response.text();
        // Standard email regex
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const matches = html.match(emailRegex) || [];

        // Deduplicate and filter junk
        const uniqueEmails = [...new Set(matches)].filter(email => {
            const lower = email.toLowerCase();
            return (
                !lower.includes('.png') &&
                !lower.includes('.jpg') &&
                !lower.includes('.jpeg') &&
                !lower.includes('.gif') &&
                !lower.includes('.svg') &&
                !lower.includes('.webp') &&
                !lower.includes('sentry') &&
                !lower.includes('example.com') &&
                !lower.includes('test@') &&
                !lower.includes('noreply') &&
                !lower.includes('no-reply') &&
                !lower.endsWith('.css') &&
                !lower.endsWith('.js') &&
                email.length < 50
            );
        });

        return uniqueEmails.slice(0, 5);
    } catch {
        return [];
    }
}
