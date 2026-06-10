import sqlite3
import json

db_path = r"C:\Users\Administrator\AppData\Roaming\Antigravity\User\globalStorage\state.vscdb"
try:
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    # List all keys to see what we have
    cur.execute("SELECT key FROM ItemTable WHERE key LIKE 'chat.%' OR key LIKE 'conversations.%'")
    rows = cur.fetchall()
    print("Found keys:")
    for row in rows:
        print(f"  {row[0]}")
    
    # Try to get the index
    cur.execute("SELECT value FROM ItemTable WHERE key = 'chat.ChatSessionStore.index'")
    row = cur.fetchone()
    if row:
        print("\nChat Index Value:")
        print(row[0])
    else:
        print("\nchat.ChatSessionStore.index NOT FOUND")
        
except Exception as e:
    print(f"Error: {e}")
finally:
    if 'conn' in locals():
        conn.close()
