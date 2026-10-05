#!/usr/bin/env python3
import sys

filepath = 'octasence-homepage-main/src/website/src/app/(main)/(about)/about-us/page.tsx'
with open(filepath, 'r') as f:
    lines = f.readlines()

line = lines[323]
print('Before:', repr(line))
if line[75] == "'":
    new_line = line[:75] + '\u2019' + line[76:]
    lines[323] = new_line
    print('After:', repr(new_line))
    with open(filepath, 'w') as f:
        f.writelines(lines)
    print('Written')
else:
    print('Apostrophe not at index 75')
    sys.exit(1)