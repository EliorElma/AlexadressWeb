# -*- coding: utf-8 -*-
# Resizes + compresses every JPEG in images/ down to the resolution the
# site actually displays (PageSpeed Insights flags "oversized images" —
# this is the fix). Run once now, and again any time you add big photos.
#
# Collection dress photos (Salin_/amor_/losi_/Koral_/Adel_/Noa_/Moniqe_/
# Alor_/Flor_ front/back/detail) get TWO files:
#   - the original filename  -> small "thumbnail" used in the grid card
#   - name-full.jpg          -> bigger version used only by the zoom
#     button's lightbox (js/main.js looks for "-full" automatically)
# Everything else (hero/studio/brides/mood/instagram/old dress-N.jpg) is
# never zoomed, so it only needs one, smaller file.
import glob, os, sys

try:
    from PIL import Image
except ImportError:
    print("Pillow is missing. Run once:  pip install Pillow")
    sys.exit(1)

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
img_dir = os.path.join(root, "images")

COLLECTION_PREFIXES = (
    "Salin_", "amor_", "losi_", "Koral_", "Adel_", "Noa_",
    "Moniqe_", "Alor_", "Flor_",
)
THUMB_MAX = 760    # grid card thumbnail — longer side, px
FULL_MAX = 1800    # lightbox zoom version — longer side, px
STANDARD_MAX = 1100  # hero/studio/brides/mood/instagram/legacy — longer side, px
QUALITY = 80

def resize_to(im, max_side):
    w, h = im.size
    longer = max(w, h)
    if longer <= max_side:
        return im
    scale = max_side / longer
    return im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)

total_before = 0
total_after = 0
count = 0

for path in sorted(glob.glob(os.path.join(img_dir, "*.jpg")) + glob.glob(os.path.join(img_dir, "*.jpeg"))):
    name = os.path.basename(path)
    if name.endswith("-full.jpg") or name.endswith("-full.jpeg"):
        continue  # already a generated full-size file; regenerated from its thumb below

    before = os.path.getsize(path)
    total_before += before

    im = Image.open(path)
    if im.mode != "RGB":
        im = im.convert("RGB")

    if name.startswith(COLLECTION_PREFIXES):
        # 1) the "-full" companion, for the lightbox zoom
        full_path = os.path.splitext(path)[0] + "-full.jpg"
        full_im = resize_to(im, FULL_MAX)
        full_im.save(full_path, "JPEG", quality=QUALITY + 2, optimize=True, progressive=True)
        total_after += os.path.getsize(full_path)  # new file — not counted in "before"

        # 2) shrink the original filename down to the small grid thumbnail
        im = resize_to(im, THUMB_MAX)
    else:
        im = resize_to(im, STANDARD_MAX)

    im.save(path, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    after = os.path.getsize(path)
    total_after += after
    count += 1
    print(f"{name}: {before//1024}KB -> {after//1024}KB  ({im.size[0]}x{im.size[1]})")

if total_before:
    pct = 100 * total_after // total_before
    print(f"\n{count} files processed.  TOTAL: {total_before//1024//1024}MB -> {total_after//1024//1024}MB  ({pct}% of original, includes new -full files)")

print()
print('Done! Now: git add . && git commit -m "optimize images" && git push')
try:
    input("Press Enter to close...")
except EOFError:
    pass
