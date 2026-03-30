import os

replacements = {
    "#06b6d4": "#8fb339", # Cyan -> Lime Green
    "#3b82f6": "#556b2f", # Blue -> Olive
    "rgba(99, 102, 241": "rgba(85, 107, 47", # Indigo -> Olive
    "#4f46e5": "#84934d",
    "#6366f1": "#6b783c",
    "#818cf8": "#94a34d",
    "#ec4899": "#d4e157",
    "#a78bfa": "#a2ad91",
    "#a855f7": "#4a5d23",
    "#0b1120": "#0f1208",
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
            content = content.replace(old.upper(), new) 
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {file_path}")
