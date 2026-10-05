#!/usr/bin/env python3
import re
import sys

filepath = 'octasence-homepage-main/src/website/src/app/(main)/(about)/about-us/page.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# replace apostrophe in asset's with '
new_content = re.sub(r"asset's", 'asset\'s', content)

with open(filepath, 'w') as f:
    f.write(new_content)

print('Replaced apostrophe in', filepath)