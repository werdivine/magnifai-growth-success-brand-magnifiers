import os
import win32api

def get_version_number(file_path):
    try:
        info = win32api.GetFileVersionInfo(file_path, "\\")
        ms = info['FileVersionMS']
        ls = info['FileVersionLS']
        return f"{win32api.HIWORD(ms)}.{win32api.LOWORD(ms)}.{win32api.HIWORD(ls)}.{win32api.LOWORD(ls)}"
    except Exception as e:
        return str(e)

paths = [
    r"C:\Users\Administrator\AppData\Local\Programs\Antigravity\Antigravity.exe",
    r"C:\DOWNLOADS\Antigravity.exe",
    r"C:\Users\Administrator\Downloads\Antigravity.exe",
    r"C:\Users\Administrator\Downloads\Antigravity (1).exe"
]

for p in paths:
    if os.path.exists(p):
        print(f"{p}: {get_version_number(p)}")
    else:
        print(f"{p}: Not found")
