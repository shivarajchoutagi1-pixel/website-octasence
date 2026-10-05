#!/usr/bin/env python3
import re

file_path = 'octasence-homepage-main/src/website/src/app/(main)/contact/form/FormPage.tsx'

with open(file_path, 'r') as f:
    content = f.read()

# Test regex
test_string = "We'll get back to you"
print("Test string:", repr(test_string))
print("Regex match:", re.search(r"We'll", test_string))
print("Replacement:", re.sub(r"We'll", "We'll", test_string))

# Check actual content
lines = content.split('\n')
for i, line in enumerate(lines, 1):
    if "We'll" in line or "We'd" in line:
        print(f"\nLine {i}: {repr(line)}")
        print("  Contains We'll:", "We'll" in line)
        print("  Contains We'd:", "We'd" in line)
        # Try replacement on this line
        new_line = re.sub(r"We'll", "We'll", line)
        new_line = re.sub(r"We'd", "We'd", new_line)
        print("  After replacement:", repr(new_line))
        print("  Changed:", new_line != line)