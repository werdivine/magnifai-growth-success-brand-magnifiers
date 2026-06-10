import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, source, name, metadata } = body;

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // 1. Log to console
        console.log(`[LEAD CAPTURE] New Lead: ${email} | Source: ${source} | Timestamp: ${new Date().toISOString()}`);

        // 2. Persist to website_leads.json
        const dataDir = path.join(process.cwd(), 'src', 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        
        const filePath = path.join(dataDir, 'website_leads.json');
        let leadsList = [];
        if (fs.existsSync(filePath)) {
            try {
                const fileData = fs.readFileSync(filePath, 'utf-8');
                leadsList = JSON.parse(fileData);
            } catch (e) {
                console.error('Error reading website_leads.json, starting fresh:', e);
            }
        }

        const newLead = {
            id: `web_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            email,
            name: name || null,
            source: source || 'unknown',
            metadata: metadata || null,
            timestamp: new Date().toISOString()
        };

        leadsList.push(newLead);
        fs.writeFileSync(filePath, JSON.stringify(leadsList, null, 2), 'utf-8');

        return NextResponse.json({ success: true, message: 'Lead captured successfully', lead: newLead });

    } catch (error) {
        console.error('[LEAD CAPTURE ERROR]', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

