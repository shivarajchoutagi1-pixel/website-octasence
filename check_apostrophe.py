#!/usr/bin/env python3
import re

with open('octasence-homepage-main/src/website/src/app/(main)/contact/form/FormPage.tsx', 'r') as f:
    content = f.read()
    lines = content.split('\n')

    # Print lines safely
    for i in range(210, min(220, len(lines))):
        print(f"{i+1}: {repr(lines[i])}")

    # Check presence
    print("\nChecking occurrences:")
    print("We'll found:", "We'll" in content)
    print("We'd found:", "We'd" in content)

    # Count occurrences
    print("\nCounts:")
    print("We'll:", content.count("We'll"))
    print("We'd:", content.count("We'd"))

    # Regex (handles curly quotes too)
    matches = re.findall(r"We['’](ll|d)", content)
    print("\nRegex matches:", matches)