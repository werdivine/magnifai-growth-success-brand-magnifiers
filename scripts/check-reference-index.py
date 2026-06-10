import sqlite3
import json

db_path = r"C:\Users\Administrator\AppData\Roaming\Antigravity\User\workspaceStorage\7b14f99836350e685c4c6d5403467f9d\state.vscdb"
try:
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    cur.execute("SELECT value FROM ItemTable WHERE key = 'saoudrizwan.claude-dev.chat.ChatSessionStore.index'")
    row = cur.fetchone()
    if row:
        print("Claude Dev Index Structure:")
        print(row[0])
    else:
        print("saoudrizwan.claude-dev.chat.ChatSessionStore.index NOT FOUND")
        
except Exception as e:
    print(f"Error: {e}")
finally:
    if 'conn' in locals():
        conn.close()
