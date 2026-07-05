#!/usr/bin/env python3
"""Build the public static-site artifact for Pages-style hosts."""
from pathlib import Path
import os
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "_site"
PUBLIC_FILES = [
    "index.html",
    "preview.html",
    "privacy.html",
    "terms.html",
    "data-deletion.html",
    "robots.txt",
    "sitemap.xml",
]
TEXT_SUFFIXES = {".html", ".js", ".xml", ".txt"}
SOURCE_ORIGIN = os.environ.get("SOURCE_ORIGIN", "https://ec92009.github.io/oleataxco").rstrip("/")
PUBLIC_ORIGIN = os.environ.get("PUBLIC_ORIGIN", "https://oleataxco.com").rstrip("/")


def copy_site() -> None:
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    for filename in PUBLIC_FILES:
        shutil.copy2(ROOT / filename, OUT / filename)

    shutil.copytree(ROOT / "assets", OUT / "assets")
    (OUT / ".nojekyll").write_text("", encoding="utf-8")


def normalize_text_files() -> None:
    for path in OUT.rglob("*"):
        if not path.is_file() or path.suffix not in TEXT_SUFFIXES:
            continue
        text = path.read_text(encoding="utf-8")
        text = text.replace('data-theme="light"', 'data-theme="dark"')
        text = text.replace('theme: "light"', 'theme: "dark"')
        text = text.replace(f"{SOURCE_ORIGIN}/", f"{PUBLIC_ORIGIN}/")
        text = text.replace(SOURCE_ORIGIN, PUBLIC_ORIGIN)
        path.write_text(text, encoding="utf-8")


def main() -> None:
    copy_site()
    normalize_text_files()


if __name__ == "__main__":
    main()
