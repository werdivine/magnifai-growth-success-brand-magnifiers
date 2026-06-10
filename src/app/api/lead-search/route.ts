import { NextResponse } from 'next/server';
import { performWebSearch, extractEmailsFromUrl } from '@/lib/searchService';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { niche, city, mode } = body;

        if (!niche || !city) {
            return NextResponse.json({ error: 'Niche and City are required' }, { status: 400 });
        }

        console.log(`[Lead Search API] Query: niche="${niche}", city="${city}", mode="${mode}"`);

        // 1. Generate Smart Queries based on Mode
        const queries: string[] = [];
        const baseQuery = `${niche} in ${city}`;

        queries.push(baseQuery);
        
        if (mode === 'neural') {
            // "Neural" mode uses more specific intent-based queries
            queries.push(`"${niche}" "${city}" email contact`);
            queries.push(`site:linkedin.com/in/ "owner" "${niche}" "${city}"`);
            queries.push(`"${niche}" "${city}" "gmail.com" OR "outlook.com"`);
        } else {
            queries.push(`${baseQuery} contact`);
        }

        // 2. Perform Searches in Parallel (limit to 2 queries to avoid timeouts)
        const searchPromises = queries.slice(0, 2).map(q => performWebSearch(q, 8));
        const searchResultsArrays = await Promise.all(searchPromises);
        
        // Flatten results
        const allResults = searchResultsArrays.flat();

        // Deduplicate by link
        const uniqueMap = new Map(allResults.map(item => [item.link.toLowerCase(), item]));
        const uniqueResults = Array.from(uniqueMap.values());

        console.log(`[Lead Search API] Total unique results: ${uniqueResults.length}`);

        // 3. Enrichment (Extract Emails) - Limit to first 5 for speed
        const enrichedResults = await Promise.all(
            uniqueResults.slice(0, 5).map(async (result) => {
                // Skip social media (auth walls) and directory aggregators
                const skipDomains = [
                    'linkedin.com', 'facebook.com', 'twitter.com', 'instagram.com',
                    'google.com/maps', 'yelp.com', 'clutch.co', 'crunchbase.com'
                ];
                
                if (skipDomains.some(d => result.link.includes(d))) {
                    return { ...result, status: 'Identified' };
                }
                
                try {
                    const emails = await extractEmailsFromUrl(result.link);
                    return {
                        ...result,
                        emails: emails.length > 0 ? emails : undefined,
                        status: emails.length > 0 ? 'Enriched' : 'Identified',
                    };
                } catch {
                    return { ...result, status: 'Identified' };
                }
            })
        );

        // Combine enriched with the rest (unenriched)
        const finalResults = [
            ...enrichedResults,
            ...uniqueResults.slice(5).map(r => ({ ...r, status: 'Identified' })),
        ];

        console.log(`[Lead Search API] Final results: ${finalResults.length} (${enrichedResults.filter(r => r.status === 'Enriched').length} enriched)`);

        return NextResponse.json({ 
            success: true, 
            results: finalResults,
            meta: {
                totalFound: finalResults.length,
                enriched: enrichedResults.filter(r => r.status === 'Enriched').length,
                mode: mode,
                query: baseQuery,
            },
        });

    } catch (error) {
        console.error('[Lead Search API] Error:', error);
        return NextResponse.json(
            { error: 'Failed to perform search', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
