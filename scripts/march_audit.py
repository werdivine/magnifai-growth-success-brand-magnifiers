import os
import time
from datetime import datetime

search_root = r'C:\Users\Administrator'
start_date = datetime(2026, 3, 1)
end_date = datetime(2026, 4, 1)

def find_march_activity():
    print(f'Scanning {search_root} for March 2026 activity...')
    march_files = []
    
    # Exclude large system dirs to save time
    exclude = ['AppData', '.vscode', '.gradle', '.npm', 'node_modules', '.git']
    
    for root, dirs, files in os.walk(search_root):
        # Prune excluded directories
        dirs[:] = [d for d in dirs if d not in exclude]
        
        for file in files:
            full_path = os.path.join(root, file)
            try:
                mtime = os.path.getmtime(full_path)
                mtime_dt = datetime.fromtimestamp(mtime)
                
                if start_date <= mtime_dt < end_date:
                    march_files.append({
                        "path": full_path,
                        "date": mtime_dt.strftime('%Y-%m-%d %H:%M:%S'),
                        "size": os.path.getsize(full_path)
                    })
            except:
                pass
                
    march_files.sort(key=lambda x: x['date'], reverse=True)
    
    with open('march_activity_audit.json', 'w', encoding='utf-8') as f:
        import json
        json.dump(march_files[:500], f, indent=2)
        
    print(f'Done. Found {len(march_files)} items from March.')

if __name__ == '__main__':
    find_march_activity()
