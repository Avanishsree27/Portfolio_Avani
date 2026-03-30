import os

replacements = {
    "#0f172a": "#0c1109",
    "#1e1b4b": "#1b2310",
    "rgba(15, 23, 42": "rgba(12, 17, 9",
    "rgba(79,70,229": "rgba(132,147,77",
    "rgba(129,140,248": "rgba(148,163,77", # Slightly darker green for dots
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
