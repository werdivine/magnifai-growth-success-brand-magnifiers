const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const brainDir = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain';
const dbPath = 'C:\\Users\\Administrator\\AppData\\Roaming\\Antigravity\\User\\workspaceStorage\\7b14f99836350e685c4c6d5403467f9d\\state.vscdb';

async function reconstruct() {
    console.log('Scanning brain directory...');
    const folders = fs.readdirSync(brainDir).filter(f => fs.statSync(path.join(brainDir, f)).isDirectory());
    console.log(`Found ${folders.length} session folders.`);

    const entries = {};
    for (const folder of folders) {
        if (folder === 'tempmediaStorage') continue;
        
        const folderPath = path.join(brainDir, folder);
        let title = folder; // Default title
        let timestamp = Date.now();

        // Try to find a title in the logs or metadata
        const logsDir = path.join(folderPath, '.system_generated', 'logs');
        if (fs.existsSync(logsDir)) {
            const overviewPath = path.join(logsDir, 'overview.txt');
            if (fs.existsSync(overviewPath)) {
                const overview = fs.readFileSync(overviewPath, 'utf8');
                const titleMatch = overview.match(/Title:\s*(.*)/);
                if (titleMatch) title = titleMatch[1];
            }
        }

        // Alternative: check for RAW_CONVERSATION_HISTORY.md metadata
        const metadataPath = path.join(folderPath, 'RAW_CONVERSATION_HISTORY.md.metadata.json');
        if (fs.existsSync(metadataPath)) {
            try {
                const meta = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
                if (meta.title) title = meta.title;
                if (meta.timestamp) timestamp = meta.timestamp;
            } catch (e) {}
        }

        entries[folder] = {
            id: folder,
            title: title,
            timestamp: timestamp
        };
    }

    const indexJson = JSON.stringify({ version: 1, entries: entries });
    console.log(`Reconstructed index with ${Object.keys(entries).length} entries.`);

    // Update the database
    const db = new sqlite3.Database(dbPath);
    db.run("INSERT OR REPLACE INTO ItemTable (key, value) VALUES (?, ?)", ['chat.ChatSessionStore.index', indexJson], function(err) {
        if (err) {
            console.error('Error updating database:', err.message);
        } else {
            console.log('✓ Database updated successfully!');
            console.log('Total sessions restored:', Object.keys(entries).length);
        }
        db.close();
    });
}

reconstruct();
