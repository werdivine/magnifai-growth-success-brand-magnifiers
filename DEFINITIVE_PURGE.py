import os
import shutil
import subprocess
import winreg
from pathlib import Path

def kill_processes():
    print(">>> Killing Antigravity processes...")
    subprocess.run(['taskkill', '/F', '/IM', 'Antigravity.exe', '/T'], capture_output=True)
    subprocess.run(['taskkill', '/F', '/IM', 'antigravity.exe', '/T'], capture_output=True)

def delete_registry_key(root, path):
    try:
        with winreg.OpenKey(root, path, 0, winreg.KEY_ALL_ACCESS) as key:
            # Delete subkeys first (recursive)
            while True:
                try:
                    subkey_name = winreg.EnumKey(key, 0)
                    delete_registry_key(root, f"{path}\\{subkey_name}")
                except OSError:
                    break
        winreg.DeleteKey(root, path)
        print(f"  [OK] Deleted Registry Key: {path}")
    except OSError:
        pass

def clean_registry():
    print(">>> Cleaning Registry...")
    # User Uninstall Key
    delete_registry_key(winreg.HKEY_CURRENT_USER, r"Software\Microsoft\Windows\CurrentVersion\Uninstall\{AA73B3E3-C6C8-45C8-B1DC-4AE56C751432}_is1")
    # System Uninstall Key (just in case)
    delete_registry_key(winreg.HKEY_LOCAL_MACHINE, r"Software\Microsoft\Windows\CurrentVersion\Uninstall\{BEE6BE00-C896-407F-9BF9-C566EB74E37C}_is1")
    # URL Protocol
    delete_registry_key(winreg.HKEY_CURRENT_USER, r"Software\Classes\antigravity")
    delete_registry_key(winreg.HKEY_LOCAL_MACHINE, r"Software\Classes\antigravity")
    # App Association
    try:
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, r"Software\Microsoft\Windows\CurrentVersion\ApplicationAssociationToasts", 0, winreg.KEY_ALL_ACCESS) as key:
            winreg.DeleteValue(key, "antigravity_antigravity")
            print("  [OK] Deleted ApplicationAssociationToast")
    except OSError:
        pass

def delete_folders():
    print(">>> Deleting Folders...")
    paths = [
        r"C:\Users\Administrator\AppData\Local\Programs\Antigravity",
        r"C:\Users\Administrator\AppData\Local\Antigravity-Updater",
        r"C:\Users\Administrator\AppData\Roaming\Antigravity",
        r"C:\Program Files\Antigravity"
    ]
    
    for p in paths:
        path = Path(p)
        if path.exists():
            try:
                shutil.rmtree(path)
                print(f"  [OK] Deleted folder: {p}")
            except Exception as e:
                print(f"  [ERR] Failed to delete {p}: {e}")

def main():
    print("="*60)
    print("ANTIGRAVITY DEFINITIVE PURGE v1.0")
    print("="*60)
    
    kill_processes()
    clean_registry()
    delete_folders()
    
    print("\n" + "="*60)
    print("PURGE COMPLETE!")
    print("="*60)
    print("\nNext Steps:")
    print("1. Locate the LATEST installer in your Downloads folder:")
    print("   -> C:\\Users\\Administrator\\Downloads\\Antigravity.exe (Version 1.23.2)")
    print("2. Run it as Administrator.")
    print("3. Choose 'Install for All Users'.")
    print("4. This will install to C:\\Program Files\\Antigravity and fix all features.")

if __name__ == "__main__":
    main()
