"""Rebuild lightweight local portrait assets. Requires Pillow; not needed to run the site."""
from pathlib import Path
from html import escape
import math
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
source = Image.open(root / "public/portrait.jpg").convert("RGB")
crop = source.crop((0, int(source.height * .13), source.width, source.height))
crop.resize((720, 835), Image.Resampling.LANCZOS).save(root / "public/portrait-study.webp", quality=86)
cols, rows = 132, 90
sample = crop.resize((cols, rows), Image.Resampling.LANCZOS)
ramp = " .,:;i1tfLCG08@"
pieces = ['<svg xmlns="http://www.w3.org/2000/svg" width="600" height="696" viewBox="0 0 600 696">', '<rect width="600" height="696" fill="#080a09"/>', '<g font-family="monospace" font-size="7.1" dominant-baseline="hanging">']
for y in range(rows):
    for x in range(cols):
        r, g, b = sample.getpixel((x, y))
        luminance = (.2126 * r + .7152 * g + .0722 * b) / 255
        ink = 0 if luminance > .945 else max(0, 1 - luminance) ** .72
        ink *= 1 - max(0, y / rows - .72) * 2.7
        if ink < .035:
            continue
        value = min(1, ink)
        glyph = ramp[min(len(ramp) - 1, int(value * (len(ramp) - 1)))]
        opacity = (.12 + value * .81) * min(1, x / 9, (cols - x) / 9, (rows - y) / 10)
        pieces.append(f'<text x="{x * 600 / cols:.2f}" y="{y * 696 / rows:.2f}" fill="#9bccaf" opacity="{opacity:.2f}">{escape(glyph)}</text>')
pieces.extend(['</g>', '</svg>'])
(root / "public/portrait-ascii.svg").write_text("".join(pieces), encoding="utf-8")

# Share image is generated locally; the original photograph stays in the project.
og = Image.new("RGB", (1200, 630), "#080a09")
draw = ImageDraw.Draw(og)
font_path = Path("C:/Windows/Fonts/bahnschrift.ttf")
mono_path = Path("C:/Windows/Fonts/consola.ttf")
def font(size, mono=False):
    path = mono_path if mono else font_path
    return ImageFont.truetype(str(path), size) if path.exists() else ImageFont.load_default(size=size)
draw.line((48, 75, 1152, 75), fill="#253029")
draw.text((48, 30), "S /.     A PERSONAL RESEARCH LABORATORY", font=font(18, True), fill="#8abfa5")
draw.text((48, 175), "MUHAMMAD", font=font(72), fill="#e4e9e2")
draw.text((48, 257), "SANAN KHAN.", font=font(72), fill="#c2cbc2")
draw.text((48, 395), "Engineering intelligence", font=font(28), fill="#e4e9e2")
draw.text((48, 438), "into real-time systems.", font=font(28), fill="#e4e9e2")
draw.text((48, 563), "COMPUTER VISION / EMBEDDED AI / SIGNAL PROCESSING", font=font(15, True), fill="#929e95")
for y in range(rows):
    for x in range(cols):
        r, g, b = sample.getpixel((x, y))
        lum = (.2126*r+.7152*g+.0722*b)/255
        value = 0 if lum > .945 else (1-lum)**.72
        if value < .08: continue
        fade = min(1, (rows-y)/16)
        shade = int((35 + value*155)*fade)
        draw.text((720+x*3.15, 94+y*5.4), ramp[min(13,int(value*13))], font=font(6,True), fill=(int(shade*.8),shade,int(shade*.87)))
og.save(root / "public/og.png", optimize=True)
print("Prepared local WebP, static ASCII fallback, and Open Graph image.")
