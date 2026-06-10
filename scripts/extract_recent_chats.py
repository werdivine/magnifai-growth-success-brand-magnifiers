import os
import string
import json
from pathlib import Path

def extract_strings(file_path):
    with open(file_path, 'rb') as f:
        data = f.read()
    
    chars = string.printable.encode('ascii')
    result = []
    current = bytearray()
    for b in data:
        if b in chars:
            current.append(b)
        else:
            if len(current) >= 4:
                try:
                    s = current.decode('ascii')
                    if s.strip():
                        result.append(s)
                except:
                    pass
            current = bytearray()
    return "\n".join(result)

def run_extraction():
    # Only process current user's conversations within restricted paths
    source_path = Path(r"C:\Users\Administrator\.gemini\antigravity\conversations")
    output_dir = Path(r"c:\Users\Administrator\wemagnifai\magnifai-growth-success-brand-magnifiers\scripts\extracted_logs")
    output_dir.mkdir(exist_ok=True, parents=True)
    
    # Process only the most recent files to avoid massive files
    files = sorted(source_path.glob("*.pb"), key=os.path.getmtime, reverse=True)[:10]
    
    for pb_file in files:
        print(f"Processing {pb_file.name}...")
        content = extract_strings(pb_file)
        out_name = f"{pb_file.name}.txt"
        with open(output_dir / out_name, 'w', encoding='utf-8') as f:
            f.write(content)
            
    print(f"Extraction complete. Files saved to {output_dir}")

if __name__ == "__main__":
    run_extraction()
