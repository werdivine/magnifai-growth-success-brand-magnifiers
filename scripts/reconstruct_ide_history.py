import os
import json
import sqlite3
import time

brain_dir = r'C:\Users\Administrator\.gemini\antigravity-ide\brain'
storage_dir = r'C:\Users\Administrator\AppData\Roaming\Antigravity IDE\User\workspaceStorage'

def reconstruct():
    print(f'Scanning brain directory: {brain_dir}')
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
            except Exception as e:
                print(f"Error reading metadata for {folder}: {e}")
        
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
            except Exception as e:
                print(f"Error reading overview for {folder}: {e}")

        # Try to find title from implementation plan if we don't have a good title
        if title == folder:
            impl_plan = os.path.join(folder_path, 'implementation_plan.md')
            if os.path.exists(impl_plan):
                try:
                    with open(impl_plan, 'r', encoding='utf-8') as f:
                        first_line = f.readline()
                        if first_line.startswith('#'):
                            title = first_line.replace('#', '').strip()
                except Exception as e:
                    pass

        entries[folder] = {
            "id": folder,
            "title": title,
            "timestamp": timestamp
        }

    index_json = json.dumps({"version": 1, "entries": entries})
    print(f'Reconstructed index with {len(entries)} entries.')

    # Update all workspaceStorage databases
    if not os.path.exists(storage_dir):
        print(f'Error: Storage directory {storage_dir} not found')
        return

    workspaces = [w for w in os.listdir(storage_dir) if os.path.isdir(os.path.join(storage_dir, w))]
    print(f'Found {len(workspaces)} workspace storage folders.')

    success_count = 0
    for ws in workspaces:
        db_path = os.path.join(storage_dir, ws, 'state.vscdb')
        if os.path.exists(db_path):
            try:
                conn = sqlite3.connect(db_path)
                cur = conn.cursor()
                cur.execute("INSERT OR REPLACE INTO ItemTable (key, value) VALUES (?, ?)", 
                            ('chat.ChatSessionStore.index', index_json))
                conn.commit()
                print(f'✓ Updated database for workspace {ws}')
                success_count += 1
            except Exception as e:
                print(f'Error updating database for workspace {ws}: {e}')
            finally:
                if 'conn' in locals():
                    conn.close()

    print(f'Restored history successfully in {success_count} workspace(s).')

if __name__ == '__main__':
    reconstruct()
