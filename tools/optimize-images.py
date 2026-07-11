# -*- coding: utf-8 -*-
# Resizes + compresses every JPEG in images/ down to the resolution the
# site actually displays (with headroom for retina + the lightbox zoom).
# Run once now, and again any time you add big new photos.
import glob, os, sys

try:
    from PIL import Image
except ImportError:
    print("Pillow is missing. Run once:  pip install Pillow")
    sys.exit(1)

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
img_dir = os.path.join(root, "images")

# Dress photos (front/back/detail) get zoomed in the lightbox, so they
# keep a bit more resolution. Everything else (hero/studio/brides/mood/
# instagram) is never shown larger than a card, so it can go smaller.
ZOOMABLE_PREFIXES = (
    "dress-", "Salin_", "amor_", "losi_", "Koral_", "Adel_", "Noa_",
    "Moniqe_", "Alor_", "Flor_",
)
MAX_ZOOMABLE = 1800   # longer side, px
MAX_STANDARD = 1300   # longer side, px
QUALITY = 80

total_before = 0
total_after = 0
count = 0

for path in sorted(glob.glob(os.path.join(img_dir, "*.jpg")) + glob.glob(os.path.join(img_dir, "*.jpeg"))):
    name = os.path.basename(path)
    before = os.path.getsize(path)
    total_before += before

    im = Image.open(path)
    if im.mode != "RGB":
        im = im.convert("RGB")

    max_side = MAX_ZOOMABLE if name.startswith(ZOOMABLE_PREFIXES) else MAX_STANDARD
    w, h = im.size
    longer = max(w, h)
    if longer > max_side:
        scale = max_side / longer
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)

    im.save(path, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    after = os.path.getsize(path)
    total_after += after
    count += 1
    print(f"{name}: {before//1024}KB -> {after//1024}KB  ({im.size[0]}x{im.size[1]})")

if total_before:
    pct = 100 * total_after // total_before
    print(f"\n{count} files.  TOTAL: {total_before//1024//1024}MB -> {total_after//1024//1024}MB  ({pct}% of original)")

print()
print('Done! Now: git add . && git commit -m "optimize images" && git push')
try:
    input("Press Enter to close...")
except EOFError:
    pass
