#!/usr/bin/env python3

file_path = 'octasence-homepage-main/src/website/src/app/(main)/contact/form/FormPage.tsx'

with open(file_path, 'r') as f:
    content = f.read()

print("File read successfully")
print("Length:", len(content))

# Check if replacements are needed
has_we_ll = "We'll" in content
has_we_d = "We'd" in content

print("Has We'll:", has_we_ll)
print("Has We'd:", has_we_d)

if has_we_ll or has_we_d:
    # Do replacements
    new_content = content.replace("We'll", "We'll")
    new_content = new_content.replace("We'd", "We'd")
    
    with open(file_path, 'w') as f:
        f.write(new_content)
    print("File updated with escaped apostrophes")
    
    # Verify
    with open(file_path, 'r') as f:
        updated = f.read()
    print("Verification:")
    print("Has We'll after:", "We'll" in updated)
    print("Has We'll after:", "We'll" in updated)
    print("Has We'd after:", "We'd" in updated)
    print("Has We'd after:", "We'd" in updated)
else:
    print("No unescaped apostrophes found")