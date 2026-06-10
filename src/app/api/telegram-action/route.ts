import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

// Simple in-memory active jobs check (since dev server is persistent)
let activeJob: { name: string; pid?: number; startTime: string } | null = null;

export async function GET() {
    return NextResponse.json({
        success: true,
        activeJob
    });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { action } = body;

        const actionMap: Record<string, string> = {
            discover: 'group_discovery',
            join: 'group_joiner',
            scrape: 'lead_scraper',
            reply: 'dm_reply_handler',
            dm: 'dm_outreach',
            engage: 'comment_engager',
            analytics: 'analytics_tracker',
            post: 'group_poster'
        };

        const moduleName = actionMap[action];
        if (!moduleName) {
            return NextResponse.json({ error: 'Invalid action name' }, { status: 400 });
        }

        if (activeJob) {
            return NextResponse.json({ 
                error: `Another action (${activeJob.name}) is currently running. Please wait for it to finish.` 
            }, { status: 400 });
        }

        const engineDir = path.join(process.cwd(), 'telegram-engine');
        const scriptPath = path.join(engineDir, 'core', 'bot_engine.js');

        if (!fs.existsSync(scriptPath)) {
            return NextResponse.json({ error: 'Telegram engine orchestrator not found' }, { status: 500 });
        }

        // Spawn as a background process
        const child = spawn('node', ['core/bot_engine.js', `--module=${moduleName}`], {
            cwd: engineDir,
            detached: true,
            stdio: 'ignore'
        });

        const jobInfo = {
            name: action,
            pid: child.pid,
            startTime: new Date().toISOString()
        };

        activeJob = jobInfo;
        child.unref();

        // Listen for exit to clear the lock (we can do a simple tracking wrapper or a timer)
        // Since we detached and unref-ed, child won't keep the event loop alive, but we can hook the process exit in Node
        if (child.pid) {
            const checkProcess = setInterval(() => {
                try {
                    // Check if process is still running
                    process.kill(child.pid!, 0);
                } catch (e) {
                    // Process is dead
                    clearInterval(checkProcess);
                    if (activeJob && activeJob.pid === child.pid) {
                        activeJob = null;
                    }
                }
            }, 3000);
        }

        return NextResponse.json({
            success: true,
            message: `Background task '${action}' started successfully.`,
            job: jobInfo
        });
    } catch (error) {
        console.error('Error executing Telegram action:', error);
        return NextResponse.json({ error: 'Failed to launch background task' }, { status: 500 });
    }
}
