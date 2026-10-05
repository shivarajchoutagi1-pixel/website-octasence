#!/usr/bin/env python3

# Fix about-us/page.tsx
about_path = 'octasence-homepage-main/src/website/src/app/(main)/(about)/about-us/page.tsx'
with open(about_path, 'r', encoding='utf-8') as f:
    about_content = f.read()

print("About page length:", len(about_content))

# Find and replace asset's
if "asset's" in about_content:
    print("Found asset's - replacing with asset's")
    new_about = about_content.replace("asset's", "asset's")
    with open(about_path, 'w', encoding='utf-8') as f:
        f.write(new_about)
    print("About page updated")
else:
    print("asset's not found in about page")

# Fix FormPage.tsx
form_path = 'octasence-homepage-main/src/website/src/app/(main)/contact/form/FormPage.tsx'
with open(form_path, 'r', encoding='utf-8') as f:
    form_content = f.read()

print("\nForm page length:", len(form_content))

changes = 0
if "We'll" in form_content:
    print("Found We'll - replacing with We'll")
    form_content = form_content.replace("We'll", "We'll")
    changes += 1

if "We'd" in form_content:
    print("Found We'd - replacing with We'd")
    form_content = form_content.replace("We'd", "We'd")
    changes += 1

if changes > 0:
    with open(form_path, 'w', encoding='utf-8') as f:
        f.write(form_content)
    print("Form page updated with", changes, "changes")
else:
    print("No We'll or We'd found in form page")

print("\nVerification:")
print("About page has asset's:", "asset's" in (new_about if 'new_about' in locals() else about_content))
print("Form page has We'll:", "We'll" in form_content)
print("Form page has We'd:", "We'd" in form_content)