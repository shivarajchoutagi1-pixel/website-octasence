#!/usr/bin/env python3

file_path = 'octasence-homepage-main/src/website/src/app/(main)/contact/form/FormPage.tsx'

with open(file_path, 'r') as f:
    content = f.read()

print("Checking for apostrophes...")
print("Length:", len(content))

# Look for the specific lines
lines = content.split('\n')
for i, line in enumerate(lines, 1):
    if "We'll" in line or "We'd" in line:
        print(f"Line {i}: {line}")
        # Show the exact characters
        for j, ch in enumerate(line):
            if ch == "'":
                print(f"  Character {j}: apostrophe (ord={ord(ch)})")
            elif ch == "&":
                print(f"  Character {j}: &")
            elif ch == "a" and line[j:j+6] == "'":
                print(f"  Character {j}: start of '")

# Check if ' exists anywhere
if "'" in content:
    print("\nFound ' in content")
else:
    print("\nNo ' found in content")

# Try a direct replacement test
test_line = "We'll get back to you"
replaced = test_line.replace("'", "'")
print(f"\nTest replacement: '{test_line}' -> '{replaced}'")