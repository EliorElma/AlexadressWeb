# -*- coding: utf-8 -*-
# Trims transparent borders from images/band-*.png files, caps their
# resolution, and converts them to WebP (much smaller than PNG while
# keeping transparency) — so the moving band at the top loads fast,
# even on mobile. Run after adding/replacing band images:
# double-click trim-bands.bat
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
WEBP_QUALITY = 85

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
img_dir = os.path.join(root, "images")

# Accept both band-*.png (new files you just added) and band-*.webp
# (already converted — re-running just re-optimizes them).
files = sorted(glob.glob(os.path.join(img_dir, "band-*.png")) + glob.glob(os.path.join(img_dir, "band-*.webp")))

if not files:
    print("No images/band-*.png or band-*.webp files found")

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

    webp_path = os.path.splitext(path)[0] + ".webp"
    im.save(webp_path, "WEBP", quality=WEBP_QUALITY, method=6)
    if webp_path != path and os.path.exists(path):
        os.remove(path)  # drop the old .png once the .webp replaces it

    after = os.path.getsize(webp_path)
    total_after += after
    print(f"{name} -> {os.path.basename(webp_path)}: {before//1024}KB -> {after//1024}KB  ({im.size[0]}x{im.size[1]})")

if total_before:
    pct = 100 * total_after // total_before
    print(f"\nTOTAL: {total_before//1024}KB -> {total_after//1024}KB  ({pct}% of original)")

print()
print("If any files were converted from .png to .webp, update the filenames")
print("in js/site-config.js (first_band) to match — e.g. band-1.png -> band-1.webp.")
print()
print('Then: git add . && git commit -m "band images" && git push')
try:
    input("Press Enter to close...")
except EOFError:
    pass
