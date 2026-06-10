import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const logPath = path.join(process.cwd(), 'telegram-engine', 'logs', 'engine.log');
        
        if (!fs.existsSync(logPath)) {
            return NextResponse.json({ success: true, logs: [] });
        }

        const rawContent = fs.readFileSync(logPath, 'utf-8');
        const rawLines = rawContent.split('\n').filter(line => line.trim() !== '');
        
        // Take the last 120 lines to display in the UI console
        const recentLines = rawLines.slice(-120);
        
        const logs = recentLines.map(line => {
            try {
                return JSON.parse(line);
            } catch (e) {
                // If a line is partially written or not JSON, return as raw message
                return {
                    level: 'info',
                    message: line,
                    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
                };
            }
        });

        return NextResponse.json({ success: true, logs });
    } catch (error) {
        console.error('Error fetching Telegram logs:', error);
        return NextResponse.json({ error: 'Failed to retrieve logs' }, { status: 500 });
    }
}
