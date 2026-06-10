import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const baseDir = path.join(process.cwd(), 'telegram-engine', 'data');
        
        const readJsonFile = (filename: string, defaultVal: any) => {
            const filepath = path.join(baseDir, filename);
            if (fs.existsSync(filepath)) {
                try {
                    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
                } catch (e) {
                    console.error(`Error parsing ${filename}:`, e);
                }
            }
            return defaultVal;
        };

        const groupsDb = readJsonFile('groups_db.json', { groups: [] });
        const leadsDb = readJsonFile('leads_db.json', { leads: [] });
        const contactedDb = readJsonFile('contacted_db.json', { contacts: [] });
        const analytics = readJsonFile('analytics.json', {
            daily: [],
            totals: {
                groups_discovered: 0,
                groups_joined: 0,
                posts_published: 0,
                leads_scraped: 0,
                dms_sent: 0,
                replies_received: 0,
                comments_posted: 0,
                estimated_pipeline: 0
            }
        });

        return NextResponse.json({
            success: true,
            groups: groupsDb.groups || [],
            leads: leadsDb.leads || [],
            contacts: contactedDb.contacts || [],
            analytics: analytics
        });
    } catch (error) {
        console.error('Error fetching Telegram data:', error);
        return NextResponse.json({ error: 'Failed to retrieve Telegram engine data' }, { status: 500 });
    }
}
