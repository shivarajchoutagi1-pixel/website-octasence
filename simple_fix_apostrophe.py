#!/usr/bin/env python3
import re

file_path = 'octasence-homepage-main/src/website/src/app/(main)/contact/form/FormPage.tsx'

with open(file_path, 'r') as f:
    content = f.read()

print("Original length:", len(content))

# Count occurrences
count_well = content.count("We'll")
count_wed = content.count("We'd")
print("Found We'll:", count_well, "times")
print("Found We'd:", count_wed, "times")

# Replace using regex
new_content = re.sub(r"We'll", "We'll", content)
new_content = re.sub(r"We'd", "We'd", new_content)

if new_content != content:
    with open(file_path, 'w') as f:
        f.write(new_content)
    print("File updated successfully")
    
    # Verify
    with open(file_path, 'r') as f:
        updated = f.read()
    print("Updated length:", len(updated))
    print("Now has We'll:", "We'll" in updated)
    print("Now has We'll:", "We'll" in updated)
    print("Now has We'd:", "We'd" in updated)
    print("Now has We'd:", "We'd" in updated)
else:
    print("No changes needed")