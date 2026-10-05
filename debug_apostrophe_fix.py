#!/usr/bin/env python3

file_path = 'octasence-homepage-main/src/website/src/app/(main)/(about)/about-us/page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

print(f"File length: {len(content)} chars")

lines = content.split('\n')

for i, line in enumerate(lines):
    if "asset's" in line:
        print(f"Line {i+1}: {repr(line)}")

        # Replace for React safety
        new_line = line.replace("asset's", "asset&apos;s")

        if new_line != line:
            print("  Fixing apostrophe...")
            lines[i] = new_line

# Write back
new_content = '\n'.join(lines)
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("File updated")

# ---- FormPage check ----
form_path = 'octasence-homepage-main/src/website/src/app/(main)/contact/form/FormPage.tsx'

with open(form_path, 'r', encoding='utf-8') as f:
    form_content = f.read()

print("\nFormPage.tsx check:")
print("Contains We'll:", "We'll" in form_content)
print("Contains We'd:", "We'd" in form_content)

# Show JSX lines with apostrophes
form_lines = form_content.split('\n')
for i, line in enumerate(form_lines):
    if "'" in line and '"' not in line:
        if '>' in line and '<' in line:
            print(f"Line {i+1}: {line.strip()[:60]}...")