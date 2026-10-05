#!/usr/bin/env python3

file_path = 'octasence-homepage-main/src/website/src/app/(main)/(about)/about-us/page.tsx'

with open(file_path, 'r') as f:
    content = f.read()

print("File length:", len(content))

# Check for asset's
if "asset's" in content:
    print("Found asset's - replacing with asset's")
    new_content = content.replace("asset's", "asset's")
    
    with open(file_path, 'w') as f:
        f.write(new_content)
    print("File updated")
else:
    print("asset's not found")
    
# Also check for any other apostrophes that might need escaping
lines = content.split('\n')
for i, line in enumerate(lines):
    if "'" in line and "'" not in line and '"' not in line:
        # Check if it's in JSX text (not in attribute or code)
        if '>' in line and '<' in line and line.find("'") > line.find('>') and line.find("'") < line.rfind('<'):
            print(f"Line {i+1}: Possible unescaped apostrophe: {line.strip()[:50]}...")