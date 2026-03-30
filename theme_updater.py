import os

replacements = {
    "#4f46e5": "#84934d",
    "#6366f1": "#6b783c",
    "#818cf8": "#94a34d",
    "#ec4899": "#d4e157",
    "#a78bfa": "#a2ad91",
    "#a855f7": "#4a5d23",
    "#0f0c29": "#1c2310",
    "#302b63": "#2d361c",
    "#1a1a2e": "#0f1208",
    "#0b1120": "#0c1109", # Dark background in Certifications
    "#0082fb": "#556b2f", # Meta blue -> Olivedrab
    "#4285f4": "#689f38", # Google blue -> Green
    "#a78bfa": "#a2ad91",
    "rgba(79, 70, 229": "rgba(132, 147, 77", # rgba primary
    "rgba(129, 140, 248": "rgba(162, 173, 145", # rgba accent
}

files = [
    r"d:\full stack development\Portfolio\style.css",
    r"d:\full stack development\Portfolio\animations.css"
]

for file_path in files:
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        for old, new in replacements.items():
            content = content.replace(old, new)
            content = content.replace(old.upper(), new) # Case insensitive for hex
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {file_path}")
    else:
        print(f"File not found: {file_path}")
