import os
import json
import sqlite3
import time

brain_dir = r'C:\Users\Administrator\.gemini\antigravity\brain'
db_path = r'C:\Users\Administrator\AppData\Roaming\Antigravity\User\workspaceStorage\7b14f99836350e685c4c6d5403467f9d\state.vscdb'

def reconstruct():
    print('Scanning brain directory...')
    if not os.path.exists(brain_dir):
        print(f'Error: {brain_dir} not found')
        return

    folders = [f for f in os.listdir(brain_dir) if os.path.isdir(os.path.join(brain_dir, f))]
    print(f'Found {len(folders)} session folders.')

    entries = {}
    for folder in folders:
        if folder == 'tempmediaStorage':
            continue
        
        folder_path = os.path.join(brain_dir, folder)
        title = folder
        timestamp = int(time.time() * 1000)

        # Try to find a title from metadata
        metadata_path = os.path.join(folder_path, 'RAW_CONVERSATION_HISTORY.md.metadata.json')
        if os.path.exists(metadata_path):
            try:
                with open(metadata_path, 'r', encoding='utf-8') as f:
                    meta = json.load(f)
                    if meta.get('title'):
                        title = meta['title']
                    if meta.get('timestamp'):
                        timestamp = meta['timestamp']
            except:
                pass
        
        # Try to find title from logs
        logs_overview = os.path.join(folder_path, '.system_generated', 'logs', 'overview.txt')
        if os.path.exists(logs_overview):
            try:
                with open(logs_overview, 'r', encoding='utf-8') as f:
                    content = f.read()
                    import re
                    match = re.search(r'Title:\s*(.*)', content)
                    if match:
                        title = match.group(1).strip()
            except:
                pass

        entries[folder] = {
            "id": folder,
            "title": title,
            "timestamp": timestamp
        }

    index_json = json.dumps({"version": 1, "entries": entries})
    print(f'Reconstructed index with {len(entries)} entries.')

    # Update the database
    try:
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        cur.execute("INSERT OR REPLACE INTO ItemTable (key, value) VALUES (?, ?)", 
                    ('chat.ChatSessionStore.index', index_json))
        conn.commit()
        print('✓ Database updated successfully!')
        print(f'Total sessions restored: {len(entries)}')
    except Exception as e:
        print(f'Error updating database: {e}')
    finally:
        if 'conn' in locals():
            conn.close()

if __name__ == '__main__':
    reconstruct()
