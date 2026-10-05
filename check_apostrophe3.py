#!/usr/bin/env python3
import re

with open('octasence-homepage-main/src/website/src/app/(main)/contact/form/FormPage.tsx', 'r') as f:
    content = f.read()
    
    lines = content.split('\n')

    # Check line 213
    if len(lines) > 212:
        line_213 = lines[212]
        print(f"Line 213: {repr(line_213)}")
        if "We'll" in line_213:
            print("Found We'll")

    # Check line 278  
    if len(lines) > 277:
        line_278 = lines[277]
        print(f"\nLine 278: {repr(line_278)}")
        if "We'd" in line_278:
            print("Found We'd")

    # Count occurrences
    we_ll_count = content.count("We'll")
    we_d_count = content.count("We'd")
    
    print("\nSearching entire file:")
    print("Occurrences of We'll:", we_ll_count)
    print("Occurrences of We'd:", we_d_count)

    # Regex (handles curly quotes too)
    matches = re.findall(r"We['’](ll|d)", content)
    print("Regex matches:", matches)