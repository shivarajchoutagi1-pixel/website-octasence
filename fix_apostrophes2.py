#!/usr/bin/env python3
import re

file_path = 'octasence-homepage-main/src/website/src/app/(main)/contact/form/FormPage.tsx'

with open(file_path, 'r') as f:
    content = f.read()

# Count before
we_ll_count = content.count("We'll")
we_d_count = content.count("We'd")

# Replace We'll with We'll
new_content = content.replace("We'll", "We'll")
# Replace We'd with We'd  
new_content = new_content.replace("We'd", "We'd")

if new_content != content:
    with open(file_path, 'w') as f:
        f.write(new_content)
    print(f"File updated successfully")
    print(f"Changes made: {we_ll_count} We'll -> We'll")
    print(f"Changes made: {we_d_count} We'd -> We'd")
else:
    print("No changes needed - file already has escaped apostrophes")