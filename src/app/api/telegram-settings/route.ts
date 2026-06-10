import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'telegram-engine', 'config.json');

function readConfig() {
    if (!fs.existsSync(CONFIG_PATH)) {
        return null;
    }
    try {
        return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
    } catch (e) {
        console.error('Error reading config:', e);
        return null;
    }
}

export async function GET() {
    const config = readConfig();
    if (!config) {
        return NextResponse.json({ error: 'Config file not found' }, { status: 404 });
    }
    
    // Return only editable targeting & limits settings for security (excluding credentials)
    return NextResponse.json({
        success: true,
        settings: {
            niche: config.niche || '',
            target_keywords: config.target_keywords || [],
            daily_dm_limit: config.daily_dm_limit || 25,
            daily_post_limit: config.daily_post_limit || 15,
            daily_group_join_limit: config.daily_group_join_limit || 10,
            cta_message: config.cta_message || '',
            lead_score_threshold: config.lead_score_threshold || 5,
            human_delay_min_seconds: config.human_delay_min_seconds || 45,
            human_delay_max_seconds: config.human_delay_max_seconds || 180,
            min_group_members: config.min_group_members || 200,
            max_group_members: config.max_group_members || 50000,
        }
    });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const config = readConfig();
        
        if (!config) {
            return NextResponse.json({ error: 'Config file not found' }, { status: 404 });
        }

        // Merge updated settings
        const updatedConfig = {
            ...config,
            niche: body.niche ?? config.niche,
            target_keywords: Array.isArray(body.target_keywords) ? body.target_keywords : config.target_keywords,
            daily_dm_limit: Number(body.daily_dm_limit) || config.daily_dm_limit,
            daily_post_limit: Number(body.daily_post_limit) || config.daily_post_limit,
            daily_group_join_limit: Number(body.daily_group_join_limit) || config.daily_group_join_limit,
            cta_message: body.cta_message ?? config.cta_message,
            lead_score_threshold: Number(body.lead_score_threshold) ?? config.lead_score_threshold,
            human_delay_min_seconds: Number(body.human_delay_min_seconds) || config.human_delay_min_seconds,
            human_delay_max_seconds: Number(body.human_delay_max_seconds) || config.human_delay_max_seconds,
            min_group_members: Number(body.min_group_members) || config.min_group_members,
            max_group_members: Number(body.max_group_members) || config.max_group_members,
        };

        fs.writeFileSync(CONFIG_PATH, JSON.stringify(updatedConfig, null, 2), 'utf-8');
        return NextResponse.json({ success: true, message: 'Settings saved successfully' });
    } catch (error) {
        console.error('Error saving config:', error);
        return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
    }
}
