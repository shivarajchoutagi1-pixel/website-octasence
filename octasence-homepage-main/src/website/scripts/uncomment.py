#!/usr/bin/env python3
import sys
import os
import re
from typing import List

def uncomment_file(filepath: str) -> int:
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    new_lines: List[str] = []
    for line in lines:
        stripped = line.rstrip('\n')
        # Remove leading // with optional space
        if stripped.startswith('//'):
            # Remove leading // and optional following space
            new_line = re.sub(r'^// ?', '', stripped)
            # If line was just // or // with whitespace, make it empty
            if new_line.strip() == '':
                new_line = ''
            new_lines.append(new_line)
        else:
            new_lines.append(stripped)
    
    # Write back
    with open(filepath, 'w') as f:
        for line in new_lines:
            f.write(line + '\n')
    
    print(f"Processed {len(lines)} lines in {filepath}")
    return len(lines)

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python uncomment.py <filepath>")
        sys.exit(1)
    
    filepath = sys.argv[1]
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        sys.exit(1)
    
    uncomment_file(filepath)