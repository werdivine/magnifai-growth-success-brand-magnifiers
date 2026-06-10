import os
import json
import time
from datetime import datetime, timedelta

brain_dir = r'C:\Users\Administrator\.gemini\antigravity\brain'
thirty_days_ago = datetime.now() - timedelta(days=30)

def audit():
    print(f'Auditing brain directory for entries since {thirty_days_ago.date()}...')
    if not os.path.exists(brain_dir):
        return

    folders = [f for f in os.listdir(brain_dir) if os.path.isdir(os.path.join(brain_dir, f))]
    
    audit_results = []
    for folder in folders:
        if folder == 'tempmediaStorage': continue
        
        folder_path = os.path.join(brain_dir, folder)
        mtime = os.path.getmtime(folder_path)
        mtime_dt = datetime.fromtimestamp(mtime)
        
        if mtime_dt < thirty_days_ago:
            continue
            
        title = "Untitled Session"
        objective = "Unknown"
        
        # Try to find title/objective from overview.txt
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
            
        # Fallback to task.md
        task_path = os.path.join(folder_path, 'task.md')
        if title == "Untitled Session" and os.path.exists(task_path):
            try:
                with open(task_path, 'r', encoding='utf-8') as f:
                    first_line = f.readline().strip()
                    if first_line.startswith('#'):
                        title = first_line.lstrip('#').strip()
            except: pass

        audit_results.append({
            "id": folder,
            "date": mtime_dt.strftime('%Y-%m-%d %H:%M:%S'),
            "title": title,
            "objective": objective[:200] + "..." if len(objective) > 200 else objective
        })

    # Sort by date
    audit_results.sort(key=lambda x: x['date'], reverse=True)
    
    with open('thirty_day_audit.json', 'w', encoding='utf-8') as f:
        json.dump(audit_results, f, indent=2)
    
    print(f'Audit complete. Found {len(audit_results)} sessions in the last 30 days.')

if __name__ == '__main__':
    audit()
