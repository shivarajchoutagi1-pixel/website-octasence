#!/usr/bin/env python3
import re

with open('octasence-homepage-main/src/website/src/app/(main)/contact/form/FormPage.tsx', 'r') as f:
    content = f.read()
    
    # Check line 213
    lines = content.split('\n')
    if len(lines) > 212:
        line_213 = lines[212]
        print(f"Line 213: {repr(line_213)}")
    
    # Check line 278  
    if len(lines) > 277:
        line_278 = lines[277]
        print(f"Line 278: {repr(line_278)}")
    
    # Use regex to find patterns
    import re
    we_ll_matches = re.findall(r"We'll", content)
    we_escaped_ll_matches = re.findall(r"We'll", content)
    we_d_matches = re.findall(r"We'd", content)
    we_escaped_d_matches = re.findall(r"We'd", content)
    
    print(f"\nWe'll matches: {len(we_ll_matches)}")
    print(f"We'll matches: {len(we_escaped_ll_matches)}")
    print(f"We'd matches: {len(we_d_matches)}")
    print(f"We'd matches: {len(we_escaped_d_matches)}")