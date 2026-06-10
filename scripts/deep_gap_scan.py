import os
import time
from datetime import datetime

base_dir = r'C:\Users\Administrator\.gemini\antigravity'
start_date = datetime(2026, 3, 17)
end_date = datetime(2026, 4, 8)

def deep_scan():
    print(f'Detailed scan for files between {start_date.date()} and {end_date.date()}...')
    found_files = []
    
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            file_path = os.path.join(root, file)
            try:
                mtime = os.path.getmtime(file_path)
                mtime_dt = datetime.fromtimestamp(mtime)
                
                if start_date <= mtime_dt <= end_date:
                    found_files.append({
                        "path": file_path,
                        "mtime": mtime_dt.strftime('%Y-%m-%d %H:%M:%S')
                    })
            except:
                pass

    # Sort and print top 100
    found_files.sort(key=lambda x: x['mtime'], reverse=True)
    
    with open('deep_scan_results.txt', 'w', encoding='utf-8') as f:
        f.write(f"Deep Scan: {start_date.date()} to {end_date.date()}\n")
        f.write("="*50 + "\n")
        for item in found_files[:100]:
            f.write(f"{item['mtime']} | {item['path']}\n")
            
    print(f'Scan complete. Found {len(found_files)} files in the gap.')

if __name__ == '__main__':
    deep_scan()
