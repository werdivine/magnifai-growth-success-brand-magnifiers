import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { first_name, last_name, bio, source_group, username } = body;

        // 1. Read config for OpenAI key
        const configPath = path.join(process.cwd(), 'telegram-engine', 'config.json');
        if (!fs.existsSync(configPath)) {
            return NextResponse.json({ error: 'Config file not found' }, { status: 500 });
        }

        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        const apiKey = config.openai_api_key;
        if (!apiKey) {
            return NextResponse.json({ error: 'OpenAI API key not configured in engine' }, { status: 400 });
        }

        const openai = new OpenAI({ apiKey });

        const name = first_name || 'there';
        const groupContext = source_group ? `in the Telegram group "${source_group}"` : 'on Telegram';

        // 2. Call OpenAI to generate high-converting outreach
        const prompt = `
        We need to acquire this person as a client for our agency: WeMagnifAI (an AI Growth Agency).
        We build custom AI systems that automate marketing, lead generation, and content creation at scale (e.g., custom scrapers, AI content generation, automatic outreach, WhatsApp automations).
        
        Prospect Profile:
        - Name: ${name} ${last_name || ''}
        - Bio/About: ${bio || 'No bio available'}
        - Discovered: ${groupContext}
        - Username: ${username ? '@' + username : 'No username'}

        Generate 3 distinct, highly personalized cold outreach messages for this prospect, following these rules:
        - Avoid standard robotic sales templates. Sound like a real founder or growth partner reaching out.
        - Focus on a "Value Bomb" or a soft case study hook.
        
        1. WHATSAPP / TELEGRAM COLD DM (concise, 3-4 sentences max):
           - Start with a friendly, casual hook mentioning the group context.
           - Introduce a single relevant growth idea or automation concept.
           - Ask an easy-to-answer question to get them talking.

        2. LINKEDIN CONNECTION NOTE (max 300 chars):
           - A super short connection hook, casual and high-context.

        3. COLD EMAIL (2-3 short paragraphs, low pressure):
           - Clear value-add subject line.
           - Personalize based on their bio/niche.
           - Offer a free 15-minute marketing audit or showing them how to automate their lead gen.
           - Direct call to action.

        Format the response strictly as a JSON object with these keys:
        - whatsapp: "string"
        - linkedin: "string"
        - email_subject: "string"
        - email_body: "string"
        `;

        const response = await openai.chat.completions.create({
            model: config.openai_model || 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: 'You are an elite B2B client acquisition strategist and copywriter. You specialize in non-spammy, highly-personalized, high-converting outreach for agency services.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.8,
            max_tokens: 600
        });

        const resText = response.choices[0].message.content || '{}';
        const parsed = JSON.parse(resText);

        return NextResponse.json({
            success: true,
            outreach: parsed
        });

    } catch (error: any) {
        console.error('Error generating outreach copy:', error);
        return NextResponse.json({ error: error.message || 'Failed to generate outreach copy' }, { status: 500 });
    }
}
