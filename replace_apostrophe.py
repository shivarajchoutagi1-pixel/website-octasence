#!/usr/bin/env python3
import sys

filepath = 'octasence-homepage-main/src/website/src/app/(main)/(about)/about-us/page.tsx'
with open(filepath, 'r') as f:
    lines = f.readlines()

line = lines[323]
print('Before:', repr(line))
new_line = line.replace("'", '\u2019')
print('After:', repr(new_line))
lines[323] = new_line

with open(filepath, 'w') as f:
    f.writelines(lines)
print('Written')