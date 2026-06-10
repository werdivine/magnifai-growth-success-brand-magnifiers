import sqlite3
import json

db_path = r"C:\Users\Administrator\AppData\Roaming\Antigravity\User\workspaceStorage\7b14f99836350e685c4c6d5403467f9d\state.vscdb"
try:
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    # List all keys
    cur.execute("SELECT key FROM ItemTable")
    rows = cur.fetchall()
    print("Found keys in Workspace Storage:")
    for row in rows:
        if 'chat' in row[0] or 'conversation' in row[0]:
            print(f"  {row[0]}")
    
    # Try to get the index
    cur.execute("SELECT value FROM ItemTable WHERE key = 'chat.ChatSessionStore.index'")
    row = cur.fetchone()
    if row:
        print("\nChat Index Value:")
        print(row[0])
    else:
        print("\nchat.ChatSessionStore.index NOT FOUND in Workspace Storage")
        
except Exception as e:
    print(f"Error: {e}")
finally:
    if 'conn' in locals():
        conn.close()
