# -*- coding: utf-8 -*-
# Trims transparent borders from all images/band-*.png files, then caps
# their resolution and compresses them, so the moving band loads fast.
# Run after adding/replacing band images: double-click trim-bands.bat
import glob, os, sys

try:
    from PIL import Image
except ImportError:
    print("Pillow is missing. Run once:  pip install Pillow")
    sys.exit(1)

# On screen the band shows each image at up to 540px tall (desktop) /
# 360px tall (phone). 1150px covers that at full retina sharpness while
# keeping file size small — no visible quality loss, much faster loading.
MAX_HEIGHT = 1150

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
files = sorted(glob.glob(os.path.join(root, "images", "band-*.png")))

if not files:
    print("No images/band-*.png files found")

total_before = 0
total_after = 0
for path in files:
    name = os.path.basename(path)
    before = os.path.getsize(path)
    total_before += before

    im = Image.open(path).convert("RGBA")
    bbox = im.split()[-1].getbbox()  # bounds of the non-transparent area
    if bbox is None:
        print(f"{name}: fully empty? skipping")
        total_after += before
        continue
    im = im.crop(bbox)

    if im.size[1] > MAX_HEIGHT:
        new_w = round(im.size[0] * MAX_HEIGHT / im.size[1])
        im = im.resize((new_w, MAX_HEIGHT), Image.LANCZOS)

    im.save(path, optimize=True, compress_level=9)
    after = os.path.getsize(path)
    total_after += after
    print(f"{name}: {before//1024}KB -> {after//1024}KB  ({im.size[0]}x{im.size[1]})")

if total_before:
    pct = 100 * total_after // total_before
    print(f"\nTOTAL: {total_before//1024}KB -> {total_after//1024}KB  ({pct}% of original)")

print()
print('Done! Now: git add . && git commit -m "band images" && git push')
try:
    input("Press Enter to close...")
except EOFError:
    pass
