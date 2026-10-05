#!/usr/bin/env python3

about_path = 'octasence-homepage-main/src/website/src/app/(main)/(about)/about-us/page.tsx'
with open(about_path, 'rb') as f:
    raw = f.read()

# Find the line with asset
lines = raw.decode('utf-8').split('\n')
for i, line in enumerate(lines):
    if 'asset' in line:
        print(f"Line {i+1}: {repr(line)}")
        
        # Check each character
        for j, ch in enumerate(line):
            if ch == "'":
                print(f"  Position {j}: apostrophe (ASCII {ord(ch)})")
            elif ch == '&':
                print(f"  Position {j}: ampersand")
            elif ch == ';':
                print(f"  Position {j}: semicolon")
        
        # Check if it contains apostrophe
        if "'" in line:
            print("  Contains apostrophe")
        else:
            print("  No apostrophe")
            
        # Show the exact substring
        idx = line.find("asset")
        if idx != -1:
            print(f"  Substring: {repr(line[idx:idx+20])}")
        break

# Also check FormPage.tsx
form_path = 'octasence-homepage-main/src/website/src/app/(main)/contact/form/FormPage.tsx'
with open(form_path, 'rb') as f:
    form_raw = f.read()

form_lines = form_raw.decode('utf-8').split('\n')
print("\nFormPage.tsx check:")

for i, line in enumerate(form_lines):
    if "We'll" in line or "We'd" in line or "We'" in line:
        print(f"Line {i+1}: {repr(line[:80])}")