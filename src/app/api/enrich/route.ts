import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: Request) {
    try {
        const { urls } = await request.json();

        if (!urls || !Array.isArray(urls)) {
            return NextResponse.json({ error: 'URL array is required' }, { status: 400 });
        }

        const results = await Promise.all(urls.slice(0, 5).map(async (url) => {
            try {
                const targetUrl = url.startsWith('http') ? url : `https://${url}`;
                const response = await fetch(targetUrl, {
                    headers: { 'User-Agent': 'Antigravity-Enricher/4.0' },
                    signal: AbortSignal.timeout(6000)
                });

                if (!response.ok) return { url, status: 'failed', error: 'Unreachable' };

                const html = await response.text();
                const $ = cheerio.load(html);
                const title = $('title').text().trim() || 'Untitled Asset';
                const h1 = $('h1').text().trim();
                const hasFB = html.includes('fbevents.js');
                const hasGTM = html.includes('googletagmanager');

                // --- GHOST WRITER ENGINE (v4.0) ---
                let flaw = "";
                let hook = "";
                let priority = "medium";

                if (!h1) {
                    flaw = "Missing H1 Anchor";
                    hook = `I was auditing ${targetUrl} and noticed your homepage is missing a primary H1 heading. This effectively makes you invisible for major search terms in your niche.`;
                    priority = "high";
                } else if (!hasFB && !hasGTM) {
                    flaw = "Pixel Blindness";
                    hook = `I saw you're not running a Meta Pixel or GTM on ${targetUrl}. You're likely losing 90% of your site traffic because you can't retarget them on social.`;
                    priority = "high";
                } else {
                    flaw = "Payload Latency";
                    hook = `I noticed some script bloat on ${targetUrl} that's dragging down your mobile speed. Even a 1s delay could be costing you 20% in conversions.`;
                    priority = "medium";
                }

                // Generate 3-Step Sequence
                const sequence = {
                    step1: {
                        subject: `Re: ${targetUrl} - Technical Gap found`,
                        body: `Hi there,\n\nI just ran a deep scan on ${targetUrl} and found a critical ${flaw}.\n\n${hook}\n\nI've recorded a 2-minute Loom showing exactly how to fix this. Should I send it over?`
                    },
                    step2: {
                        subject: `Quick follow up on the ${flaw} fix for ${targetUrl}`,
                        body: `Wanted to make sure you saw my note. Ignoring the ${flaw} is basically leaving money on the table for your competitors.\n\nI have the fix ready. Let me know if you want the video.`
                    },
                    step3: {
                        subject: `Final note / ${targetUrl} audit`,
                        body: `I'll stop bugging you, but I genuinely think fixing this ${flaw} could be a game-changer for your Q1 growth.\n\nHere is my booking link if you want a 10-min strategy session: [CALENDLY_LINK]`
                    }
                };

                return {
                    url: targetUrl,
                    title,
                    priority,
                    hook,
                    sequence,
                    status: 'success'
                };
            } catch (err) {
                return { url, status: 'failed', error: 'Timeout' };
            }
        }));

        return NextResponse.json({ results });

    } catch (error) {
        return NextResponse.json({ error: 'Command Center Enrichment Failed' }, { status: 500 });
    }
}
