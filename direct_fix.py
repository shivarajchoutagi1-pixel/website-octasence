#!/usr/bin/env python3

file_path = 'octasence-homepage-main/src/website/src/app/(main)/contact/form/FormPage.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

print("File length:", len(content))

# Safe checks (NO f-string issues)
print("Before: We'll in content =", "We'll" in content)
print("Before: We&apos;ll in content =", "We&apos;ll" in content)

# Count BEFORE replacing
will_count = content.count("We'll")
would_count = content.count("We'd")

# ✅ REAL replacement
new_content = content.replace("We'll", "We&apos;ll")
new_content = new_content.replace("We'd", "We&apos;d")

if new_content != content:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("✅ File updated")

    # Verify
    print("After: We'll in content =", "We'll" in new_content)
    print("After: We&apos;ll in content =", "We&apos;ll" in new_content)

    print("Changes made:", will_count, "We'll -> We&apos;ll")
    print("Changes made:", would_count, "We'd -> We&apos;d")

else:
    print("No changes needed")

    idx = content.find("We'll")
    if idx != -1:
        print("Found 'We'll' at position", idx)
        print("Context:", content[idx-10:idx+20])  # type: ignore
    else:
        print("Could not find 'We'll'")