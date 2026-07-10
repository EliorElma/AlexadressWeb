# -*- coding: utf-8 -*-
# Trims transparent borders from all images/band-*.png files.
# Run after adding/replacing band images: double-click trim-bands.bat
import glob, os, sys

try:
    from PIL import Image
except ImportError:
    print("Pillow is missing. Run once:  pip install Pillow")
    sys.exit(1)

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
files = sorted(glob.glob(os.path.join(root, "images", "band-*.png")))

if not files:
    print("No images/band-*.png files found")

for path in files:
    name = os.path.basename(path)
    im = Image.open(path).convert("RGBA")
    bbox = im.split()[-1].getbbox()  # bounds of the non-transparent area
    if bbox is None:
        print(f"{name}: fully empty? skipping")
        continue
    cropped = im.crop(bbox)
    if cropped.size == im.size:
        print(f"{name}: already trimmed ({im.size[0]}x{im.size[1]})")
    else:
        cropped.save(path)
        print(f"{name}: trimmed {im.size[0]}x{im.size[1]} -> {cropped.size[0]}x{cropped.size[1]}")

print()
print('Done! Now: git add . && git commit -m "band images" && git push')
try:
    input("Press Enter to close...")
except EOFError:
    pass
