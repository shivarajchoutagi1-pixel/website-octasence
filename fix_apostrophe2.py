#!/usr/bin/env python3
import sys

filepath = 'octasence-homepage-main/src/website/src/app/(main)/(about)/about-us/page.tsx'
with open(filepath, 'r') as f:
    lines = f.readlines()

print('Line 324 before:', repr(lines[323]))
if "asset's" in lines[323]:
    lines[323] = lines[323].replace("asset's", "asset's")
    print('Line 324 after:', repr(lines[323]))
    with open(filepath, 'w') as f:
        f.writelines(lines)
    print('Written')
else:
    print('Pattern not found')
    # maybe the apostrophe is a different character
    for i, ch in enumerate(lines[323]):
        if ch == "'":
            print(f"Found apostrophe at position {i}")
            # replace the whole line with manual replacement
            # rebuild the line
            new_line = lines[323][:i] + '\u2019' + lines[323][i+1:]
            lines[323] = new_line
            with open(filepath, 'w') as f:
                f.writelines(lines)
            print('Replaced via character position')
            break