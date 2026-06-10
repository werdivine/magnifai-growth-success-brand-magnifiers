import os
import json
import sqlite3
import re
from datetime import datetime

# Paths to search
GEMINI_DIRS = [
    r'C:\Users\Administrator\.gemini\antigravity-ide',
    r'C:\Users\Administrator\.gemini\antigravity'
]

ROAMING_DIR = r'C:\Users\Administrator\AppData\Roaming'
PROFILE_NAMES = ['Antigravity IDE', 'Antigravity']
EXTENSION_IDS = ['saoudrizwan.claude-dev', 'rooveterinaryinc.roo-cline', 'matterai.axon-code']

DBS = [
    r'C:\Users\Administrator\AppData\Roaming\Antigravity IDE\User\globalStorage\state.vscdb',
    r'C:\Users\Administrator\AppData\Roaming\Antigravity\User\globalStorage\state.vscdb'
]

KEYS = [
    'saoudrizwan.claude-dev.chat.ChatSessionStore.index',
    'rooveterinaryinc.roo-cline.chat.ChatSessionStore.index',
    'matterai.axon-code.chat.ChatSessionStore.index',
    'chat.ChatSessionStore.index'
]

def clean_title(title):
    if not title:
        return "Untitled Conversation"
    # Remove XML-like tags, newlines, extra spaces
    title = re.sub(r'<[^>]+>', ' ', title)
    title = title.replace('\n', ' ').replace('\r', ' ').strip()
    # Collapse multiple spaces
    title = re.sub(r'\s+', ' ', title)
    if len(title) > 80:
        return title[:77] + "..."
    return title or "Untitled Conversation"

def extract_title_and_date_from_brain(conv_id, gemini_dir):
    brain_dir = os.path.join(gemini_dir, 'brain', conv_id)
    pb_file = os.path.join(gemini_dir, 'conversations', f'{conv_id}.pb')
    
    title = None
    last_date = None
    
    # 1. Try transcript.jsonl in brain folder
    transcript_path = os.path.join(brain_dir, '.system_generated', 'logs', 'transcript.jsonl')
    if os.path.exists(transcript_path):
        try:
            with open(transcript_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                if lines:
                    # Get title from first line (step 0 - USER_INPUT)
                    try:
                        first_step = json.loads(lines[0])
                        content = first_step.get('content', '')
                        req_match = re.search(r'<USER_REQUEST>(.*?)</USER_REQUEST>', content, re.DOTALL)
                        if req_match:
                            title = req_match.group(1).strip()
                        else:
                            title = content.strip()
                    except:
                        pass
                    
                    # Get last message date from last line
                    try:
                        last_step = json.loads(lines[-1])
                        created_at = last_step.get('created_at')
                        if created_at:
                            # Try parsing with decimals or Z
                            created_at = created_at.rstrip('Z')
                            for fmt in ('%Y-%m-%dT%H:%M:%S.%f', '%Y-%m-%dT%H:%M:%S'):
                                try:
                                    dt = datetime.strptime(created_at, fmt)
                                    last_date = dt.isoformat()
                                    break
                                except ValueError:
                                    pass
                    except:
                        pass
        except:
            pass

    # 2. Fallback to PB file mtime
    if not last_date and os.path.exists(pb_file):
        try:
            mtime = os.path.getmtime(pb_file)
            last_date = datetime.fromtimestamp(mtime).isoformat()
        except:
            pass
            
    if title:
        title = clean_title(title)
        
    return title, last_date

def extract_from_ui_messages(ui_msg_path, task_folder):
    title = None
    last_date = None
    
    try:
        with open(ui_msg_path, 'r', encoding='utf-8') as f:
            msgs = json.load(f)
            if msgs and isinstance(msgs, list):
                # Title from the first user request
                for msg in msgs:
                    # Look for say text or message text
                    text = msg.get('text') or msg.get('say')
                    if text and isinstance(text, str):
                        req_match = re.search(r'<USER_REQUEST>(.*?)</USER_REQUEST>', text, re.DOTALL)
                        if req_match:
                            title = req_match.group(1).strip()
                        else:
                            title = text.strip()
                        break
                
                # Date from last message ts
                # Find the last message with a timestamp
                for msg in reversed(msgs):
                    ts = msg.get('ts')
                    if ts:
                        try:
                            # ts is usually in ms
                            dt = datetime.fromtimestamp(ts / 1000.0)
                            last_date = dt.isoformat()
                            break
                        except:
                            pass
    except Exception as e:
        print(f"Error parsing ui_messages.json at {ui_msg_path}: {e}")
        
    if not last_date:
        try:
            mtime = os.path.getmtime(ui_msg_path)
            last_date = datetime.fromtimestamp(mtime).isoformat()
        except:
            pass
            
    if title:
        title = clean_title(title)
        
    return title, last_date

def reconstruct():
    print("=== STARTING UNIFIED HISTORY RECONSTRUCTION ===")
    
    # Combined dictionary of unique conversations
    # key: conversationId, value: { conversationId, lastMessageDate, title }
    entries = {}
    
    # 1. Scan .pb files in gemini directories
    pb_ids = set()
    for gdir in GEMINI_DIRS:
        conv_dir = os.path.join(gdir, 'conversations')
        if os.path.exists(conv_dir):
            for f in os.listdir(conv_dir):
                if f.endswith('.pb'):
                    cid = f[:-3]
                    pb_ids.add((cid, gdir))
                    
    print(f"Found {len(pb_ids)} unique conversation files in .gemini directories.")
    
    for cid, gdir in pb_ids:
        title, last_date = extract_title_and_date_from_brain(cid, gdir)
        if not title:
            title = "Untitled Conversation"
        if not last_date:
            last_date = datetime.now().isoformat()
            
        entries[cid] = {
            "conversationId": cid,
            "lastMessageDate": last_date,
            "title": title
        }
        
    # 2. Scan AppData Roaming tasks directories (Cline / Roo Code)
    task_folders_found = 0
    for profile in PROFILE_NAMES:
        for ext in EXTENSION_IDS:
            tasks_dir = os.path.join(ROAMING_DIR, profile, 'User', 'globalStorage', ext, 'tasks')
            if os.path.exists(tasks_dir):
                print(f"Scanning tasks directory: {tasks_dir}")
                for d in os.listdir(tasks_dir):
                    task_path = os.path.join(tasks_dir, d)
                    if os.path.isdir(task_path):
                        ui_msg_path = os.path.join(task_path, 'ui_messages.json')
                        if os.path.exists(ui_msg_path):
                            task_folders_found += 1
                            cid = d # Folder name is the conversation UUID
                            
                            t_title, t_date = extract_from_ui_messages(ui_msg_path, task_path)
                            
                            # Merge or add
                            if cid in entries:
                                # Keep the one with the newer timestamp, or keep the existing title if better
                                existing = entries[cid]
                                if t_date and t_date > existing["lastMessageDate"]:
                                    existing["lastMessageDate"] = t_date
                                if t_title and t_title != "Untitled Conversation":
                                    existing["title"] = t_title
                            else:
                                if not t_title:
                                    t_title = "Untitled Conversation"
                                if not t_date:
                                    t_date = datetime.now().isoformat()
                                entries[cid] = {
                                    "conversationId": cid,
                                    "lastMessageDate": t_date,
                                    "title": t_title
                                }
                                
    print(f"Found {task_folders_found} ui_messages.json tasks in AppData Roaming.")
    print(f"Consolidated total unique conversations: {len(entries)}")
    
    # Sort entries by lastMessageDate descending
    sorted_entries = sorted(entries.values(), key=lambda x: x['lastMessageDate'], reverse=True)
    
    # Build index dictionary
    index_dict = {
        "version": 1,
        "entries": {item['conversationId']: item for item in sorted_entries}
    }
    
    index_json = json.dumps(index_dict)
    
    # 3. Update globalStorage databases
    for db_path in DBS:
        if not os.path.exists(db_path):
            print(f"Global DB not found: {db_path}")
            continue
            
        try:
            conn = sqlite3.connect(db_path)
            cursor = conn.cursor()
            cursor.execute("CREATE TABLE IF NOT EXISTS ItemTable (key TEXT UNIQUE, value TEXT)")
            for key in KEYS:
                cursor.execute("INSERT OR REPLACE INTO ItemTable (key, value) VALUES (?, ?)", (key, index_json))
                print(f"  Successfully updated key: {key} in DB: {db_path}")
            conn.commit()
            conn.close()
            print(f"✓ Completed updates for DB: {db_path}")
        except Exception as e:
            print(f"ERROR updating DB {db_path}: {e}")
            
    # 4. Update workspaceStorage databases
    # Let's search all workspaceStorage databases under both profiles
    for profile in PROFILE_NAMES:
        ws_dir = os.path.join(ROAMING_DIR, profile, 'User', 'workspaceStorage')
        if os.path.exists(ws_dir):
            workspaces = [w for w in os.listdir(ws_dir) if os.path.isdir(os.path.join(ws_dir, w))]
            print(f"Updating workspaceStorage databases in {ws_dir} ({len(workspaces)} folders)")
            for ws in workspaces:
                db_path = os.path.join(ws_dir, ws, 'state.vscdb')
                if os.path.exists(db_path):
                    try:
                        conn = sqlite3.connect(db_path)
                        cursor = conn.cursor()
                        cursor.execute("CREATE TABLE IF NOT EXISTS ItemTable (key TEXT UNIQUE, value TEXT)")
                        # In workspace storage, Roo Code/Cline sometimes write to the index as well
                        for key in KEYS:
                            cursor.execute("INSERT OR REPLACE INTO ItemTable (key, value) VALUES (?, ?)", (key, index_json))
                        conn.commit()
                        conn.close()
                    except Exception as e:
                        print(f"  Error updating workspace storage DB {db_path}: {e}")
                        
    print("=== RECONSTRUCTION SYSTEM COMPLETED successfully ===")

if __name__ == '__main__':
    reconstruct()
