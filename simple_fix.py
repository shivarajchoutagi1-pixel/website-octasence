#!/usr/bin/env python3

# Fix about-us/page.tsx
about_path = 'octasence-homepage-main/src/website/src/app/(main)/(about)/about-us/page.tsx'

with open(about_path, 'r', encoding='utf-8') as f:
    about_content = f.read()

print(f"About page length: {len(about_content)}")

new_about = about_content.replace("asset's", "asset&apos;s")

if new_about != about_content:
    print("Fixing asset's → asset&apos;s")
    with open(about_path, 'w', encoding='utf-8') as f:
        f.write(new_about)
    print("About page updated")
else:
    print("No changes needed in about page")


# Fix FormPage.tsx
form_path = 'octasence-homepage-main/src/website/src/app/(main)/contact/form/FormPage.tsx'

with open(form_path, 'r', encoding='utf-8') as f:
    form_content = f.read()

print(f"\nForm page length: {len(form_content)}")

new_form = form_content
new_form = new_form.replace("We'll", "We&apos;ll")
new_form = new_form.replace("We'd", "We&apos;d")

if new_form != form_content:
    print("Fixing apostrophes in form page")
    with open(form_path, 'w', encoding='utf-8') as f:
        f.write(new_form)
    print("Form page updated")
else:
    print("No changes needed in form page")


# Verification (SAFE)
print("\nVerification:")
print("About page has asset&apos;s:", "asset&apos;s" in new_about)
print("Form page has We&apos;ll:", "We&apos;ll" in new_form)
print("Form page has We&apos;d:", "We&apos;d" in new_form)