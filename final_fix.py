#!/usr/bin/env python3
import sys

filepath = 'octasence-homepage-main/src/website/src/app/(main)/(about)/about-us/page.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

line = lines[323]
print('Before:', repr(line))
# replace apostrophe with '
new_line = line.replace("'", '\u2019')
print('After:', repr(new_line))
lines[323] = new_line

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(lines)
print('Written')