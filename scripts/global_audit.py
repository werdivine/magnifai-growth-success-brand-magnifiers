import os
import json
import time
from datetime import datetime, timedelta

accounts = {
    "Administrator": r'C:\Users\Administrator\.gemini\antigravity\brain',
    "natur": r'C:\Users\natur\.gemini\antigravity\brain',
    "Manish": r'C:\Users\Manish\.gemini\antigravity\brain'
}

def audit_all():
    print(f'Auditing across all documented accounts...')
    
    all_results = []
    
    for account_name, brain_dir in accounts.items():
        if not os.path.exists(brain_dir):
            print(f'Skipping {account_name}: folder not found')
            continue

        print(f'Scanning {account_name}...')
        folders = [f for f in os.listdir(brain_dir) if os.path.isdir(os.path.join(brain_dir, f))]
        
        for folder in folders:
            if folder == 'tempmediaStorage': continue
            
            folder_path = os.path.join(brain_dir, folder)
            mtime = os.path.getmtime(folder_path)
            mtime_dt = datetime.fromtimestamp(mtime)
            
            title = "Untitled Session"
            objective = "Unknown"
            
            # Try to find title/objective
            logs_overview = os.path.join(folder_path, '.system_generated', 'logs', 'overview.txt')
            if os.path.exists(logs_overview):
                try:
                    with open(logs_overview, 'r', encoding='utf-8') as f:
                        content = f.read()
                        import re
                        m_title = re.search(r'Title:\s*(.*)', content)
                        if m_title: title = m_title.group(1).strip()
                        m_obj = re.search(r'Objective:\s*([\s\S]*?)(?=\n\n|\Z)', content)
                        if m_obj: objective = m_obj.group(1).strip()
                except: pass
            
            all_results.append({
                "account": account_name,
                "id": folder,
                "date": mtime_dt.strftime('%Y-%m-%d %H:%M:%S'),
                "title": title,
                "objective": objective[:200] + "..." if len(objective) > 200 else objective
            })

    # Sort by date
    all_results.sort(key=lambda x: x['date'], reverse=True)
    
    with open('global_audit_results.json', 'w', encoding='utf-8') as f:
        json.dump(all_results, f, indent=2)
    
    print(f'Global Audit complete. Found {len(all_results)} total unique session records.')

if __name__ == '__main__':
    audit_all()
