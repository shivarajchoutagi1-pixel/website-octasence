#!/usr/bin/env python3
import re

file_path = 'octasence-homepage-main/src/website/src/app/(main)/contact/form/FormPage.tsx'

with open(file_path, 'r') as f:
    content = f.read()

# Replace We'll with We'll
new_content = content.replace("We'll", "We'll")
# Replace We'd with We'd  
new_content = new_content.replace("We'd", "We'd")

if new_content != content:
    with open(file_path, 'w') as f:
        f.write(new_content)
    print("File updated successfully")
    print("Changes made:", content.count("We'll"), "We'll -> We&apos;ll")
    print("Changes made:", content.count("We'd"), "We'd -> We&apos;d")
else:
    print("No changes needed - file already has escaped apostrophes")