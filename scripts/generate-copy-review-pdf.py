#!/usr/bin/env python3
"""Generate PDF copy-review document using PyMuPDF."""
import importlib.util
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "copy-review" / "ODA-Demo-Copy-Review.pdf"
REVIEW_URL = "https://oceandata4ai.github.io/oceandata4ai-hub/docs/copy-review/review.html"
DEMO_URL = "https://oceandata4ai.github.io/oceandata4ai-hub/"

_spec = importlib.util.spec_from_file_location(
    "gen_docx", ROOT / "scripts" / "generate-copy-review-docx.py"
)
_mod = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_mod)
SECTIONS = _mod.SECTIONS


def main():
    doc = fitz.open()
    page = doc.new_page(width=595, height=842)  # A4
    y = 50
    margin = 50
    width = 595 - 2 * margin

    def write(text, size=11, bold=False, color=(0, 0, 0)):
        nonlocal y, page
        if y > 780:
            page = doc.new_page(width=595, height=842)
            y = 50
        font = "helv"
        page.insert_text((margin, y), text, fontsize=size, fontname=font, color=color)
        y += size * 1.4

    write("OceanData4AI Demo Copy Review", 18, bold=True)
    write(f"Live demo: {DEMO_URL}", 10, color=(0.15, 0.39, 0.92))
    write(f"Visual review page: {REVIEW_URL}", 10, color=(0.15, 0.39, 0.92))
    write("Please reference ID codes when submitting feedback.", 10)
    y += 10

    for section_title, page_url, rows in SECTIONS:
        write(section_title, 13, bold=True)
        write(f"Preview: {page_url}", 9, color=(0.4, 0.4, 0.4))
        for rid, loc, text, typ in rows:
            line = f"{rid} | {loc} | [{typ}] {text}"
            # wrap long lines
            while len(line) > 95:
                write(line[:95], 9)
                line = "    " + line[95:]
            write(line, 9)
        y += 8

    page = doc.new_page(width=595, height=842)
    y = 50
    write("Expert Feedback Form", 14, bold=True)
    write("ID | Reviewer | Type | Suggestion | Priority", 10, bold=True)
    for _ in range(12):
        write("_" * 80, 10)
        y += 4

    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc.save(OUT)
    doc.close()
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
