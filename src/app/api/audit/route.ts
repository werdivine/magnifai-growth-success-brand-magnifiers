import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: Request) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        let targetUrl = url.trim();
        if (!targetUrl.startsWith('http')) {
            targetUrl = `https://${targetUrl}`;
        }

        const fetchStartTime = Date.now();
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Antigravity-Oracle/4.0; +https://wemagnifai.com)',
            },
            next: { revalidate: 0 }
        });
        const loadTime = Date.now() - fetchStartTime;

        if (!response.ok) {
            return NextResponse.json({ error: `Connection Refused: Site might be blocking automated audits.` }, { status: 400 });
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // --- NEURAL PULSE: Advanced Signal Detection ---

        // 1. Social Intelligence (Pixels/Scripts)
        const hasFB = html.includes('fbevents.js') || html.includes('facebook-jssdk');
        const hasGTM = html.includes('googletagmanager.com/gtm.js');
        const hasLinkedIn = html.includes('snap.licdn.com');
        const hasHotjar = html.includes('static.hotjar.com');

        // 2. Technical Stack
        const isNextJS = html.includes('__NEXT_DATA__');
        const isWordPress = html.includes('wp-content');
        const isShopify = html.includes('myshopify.com');

        // 3. SEO & Semantic
        const title = $('title').text().trim();
        const description = $('meta[name="description"]').attr('content') || '';
        const h1s = $('h1').map((i, el) => $(el).text().trim()).get();
        const h2Count = $('h2').length;
        const totalImages = $('img').length;
        const missingAlt = $('img').filter((i, el) => !$(el).attr('alt')).length;

        // 4. Scoring Engine v4.0 (Weighted)
        let score = 100;
        const analysis = [];

        // Performance & Security
        if (loadTime > 2500) {
            score -= 15;
            analysis.push({ type: 'perf', severity: 'high', title: 'Latency Gap', msg: `Server responded in ${loadTime}ms. This triggers high bounce rates on mobile.` });
        }
        if (!targetUrl.startsWith('https')) {
            score -= 20;
            analysis.push({ type: 'security', severity: 'critical', title: 'Insecure Protocol', msg: 'Site is running on HTTP. User data is exposed.' });
        }

        // Conversion Pulse
        if (!hasFB && !hasGTM) {
            score -= 10;
            analysis.push({ type: 'conversion', severity: 'medium', title: 'Data Blindness', msg: 'No tracking pixels detected. You are flying blind with your marketing spend.' });
        } else {
            analysis.push({ type: 'conversion', severity: 'good', title: 'Measurement Ready', msg: 'Analytics/Pixels detected. Site is ready for paid scaling.' });
        }

        // Content Quality
        if (h1s.length === 0) {
            score -= 20;
            analysis.push({ type: 'seo', severity: 'critical', title: 'Missing Anchor H1', msg: 'No H1 found. Search engines cannot identify your primary service.' });
        }

        // --- ORACLE INSIGHTS ---
        let insight = "Your site is structurally sound but lacks conversion-tracking depth.";
        if (h1s.length === 0) insight = "Implement a high-intent H1 immediately to capture local search volume.";
        if (!hasFB && !hasGTM) insight = "Install Meta Pixel and GTM to begin building retargeting audiences.";
        if (loadTime > 3000) insight = "Optimize server-side assets to reduce load time below 2s for improved ranking.";

        return NextResponse.json({
            meta: {
                url: targetUrl,
                score: Math.max(0, score),
                loadTime,
                platform: isNextJS ? 'Next.js' : isWordPress ? 'WordPress' : isShopify ? 'Shopify' : 'Custom Stack'
            },
            data: {
                title,
                description,
                headers: { h1: h1s[0], count: h1s.length, h2Count },
                socialPulse: { hasFB, hasGTM, hasLinkedIn, hasHotjar },
                images: { total: totalImages, missingAlt }
            },
            analysis,
            insight
        });

    } catch (error) {
        console.error('Audit Error:', error);
        return NextResponse.json({ error: 'Intensive scan failed. Destination server might be offline.' }, { status: 500 });
    }
}
