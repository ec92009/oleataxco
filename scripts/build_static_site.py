#!/usr/bin/env python3
"""Build the public static-site artifact for Pages-style hosts."""
from pathlib import Path
import os
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "_site"
PUBLIC_FILES = [
    "VERSION",
    "index.html",
    "privacy.html",
    "terms.html",
    "data-deletion.html",
    "robots.txt",
    "sitemap.xml",
]
TEXT_SUFFIXES = {".html", ".js", ".xml", ".txt"}
SOURCE_ORIGIN = os.environ.get("SOURCE_ORIGIN", "https://ec92009.github.io/oleataxco").rstrip("/")
PUBLIC_ORIGIN = os.environ.get("PUBLIC_ORIGIN", "https://oleataxco.com").rstrip("/")
INCLUDE_PREVIEW = os.environ.get("INCLUDE_PREVIEW", "1") == "1"
WST_PREVIEW = os.environ.get("WST_PREVIEW", "0") == "1"
WST_DISCLOSURE_MARKER = "<!-- WST_PREVIEW_DISCLOSURE -->"


def copy_site() -> None:
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    for filename in PUBLIC_FILES:
        shutil.copy2(ROOT / filename, OUT / filename)

    if INCLUDE_PREVIEW:
        shutil.copy2(ROOT / "preview.html", OUT / "preview.html")

    shutil.copytree(ROOT / "assets", OUT / "assets")
    if WST_PREVIEW:
        shutil.copy2(ROOT / "monitoring" / "wst-beacon.js", OUT / "assets" / "wst-beacon.js")
        (OUT / "_headers").write_text(
            "/*\n  X-Robots-Tag: noindex, nofollow, noarchive\n",
            encoding="utf-8",
        )
    (OUT / ".nojekyll").write_text("", encoding="utf-8")


def install_monitoring_preview() -> None:
    if not WST_PREVIEW:
        return

    index_path = OUT / "index.html"
    text = index_path.read_text(encoding="utf-8")
    disclosure = (
        '<p data-wst-preview-disclosure>This review counts synthetic visits and button presses '
        'for site improvement. They do not enter production totals, and no form contents or '
        'visitor/session IDs are collected.</p>'
    )
    beacon = """<script
    src="assets/wst-beacon.js?v=1.1.1"
    data-wst-enabled="true"
    data-wst-endpoint="https://web-signals-collector.ec92009.workers.dev/v1/events"
    data-wst-site="olea-tax"
    data-wst-environment="preview"
    data-wst-consent="not_required"
    data-wst-synthetic="true"
    data-wst-sessionless="true"
  ></script>"""
    if WST_DISCLOSURE_MARKER not in text or "</body>" not in text:
        raise RuntimeError("monitoring preview insertion points are missing")
    text = text.replace(WST_DISCLOSURE_MARKER, disclosure, 1)
    text = text.replace("</body>", f"  {beacon}\n</body>", 1)
    index_path.write_text(text, encoding="utf-8")


def normalize_text_files() -> None:
    for path in OUT.rglob("*"):
        if not path.is_file() or path.suffix not in TEXT_SUFFIXES:
            continue
        text = path.read_text(encoding="utf-8")
        text = text.replace(f"{SOURCE_ORIGIN}/", f"{PUBLIC_ORIGIN}/")
        text = text.replace(SOURCE_ORIGIN, PUBLIC_ORIGIN)
        path.write_text(text, encoding="utf-8")


def main() -> None:
    copy_site()
    normalize_text_files()
    install_monitoring_preview()


if __name__ == "__main__":
    main()
