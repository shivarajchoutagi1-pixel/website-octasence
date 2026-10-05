#!/usr/bin/env python3
import re

file_path = 'octasence-homepage-main/src/website/src/app/(main)/contact/form/FormPage.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

print("File length:", len(content))

# Proper checks
has_we_ll = "We'll" in content
has_we_escaped_ll = "We&apos;ll" in content

has_we_d = "We'd" in content
has_we_escaped_d = "We&apos;d" in content

print("Contains We'll:", has_we_ll)
print("Contains We&apos;ll:", has_we_escaped_ll)
print("Contains We'd:", has_we_d)
print("Contains We&apos;d:", has_we_escaped_d)

# Regex checks (both forms)
matches_plain = re.findall(r"We'll", content)
matches_escaped = re.findall(r"We&apos;ll", content)

print("Regex matches for We'll:", len(matches_plain))
print("Regex matches for We&apos;ll:", len(matches_escaped))

# Show snippet
lines: list[str] = content.split('\n')

for i, line in enumerate(lines[210:220], start=211):  # type: ignore
    if "We" in line:
        print("Line", i, ":", repr(line))