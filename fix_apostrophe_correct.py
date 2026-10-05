#!/usr/bin/env python3
import sys

filepath = 'octasence-homepage-main/src/website/src/app/(main)/(about)/about-us/page.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

line = lines[323]
print('Before:', repr(line))

if len(line) > 75 and line[75] == "'":
    new_line = line[:75] + "'" + line[76:]
    lines[323] = new_line
    print('After:', repr(new_line))

    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(lines)

    print('Written')
else:
    print('Apostrophe not at index 75')
    sys.exit(1)