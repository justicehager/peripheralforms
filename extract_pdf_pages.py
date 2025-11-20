#!/usr/bin/env python3
import fitz  # PyMuPDF
import os

# Path to the PDF
pdf_path = '/home/user/peripheralforms/exhibition/public/artworks/perfect_users/IMG_20251103_031618_519 - zrtlrnc sbstn (1).pdf'
output_dir = '/home/user/peripheralforms/exhibition/public/artworks/perfect_users'

# Open the PDF
pdf_document = fitz.open(pdf_path)
total_pages = len(pdf_document)

print(f"Processing {total_pages} pages from PDF...")

# Extract each page as an image
for page_num in range(total_pages):
    page = pdf_document[page_num]

    # Render page to an image with high resolution (300 DPI)
    matrix = fitz.Matrix(3.0, 3.0)  # 3x zoom for 300 DPI (default is 72 DPI)
    pix = page.get_pixmap(matrix=matrix)

    # Save as PNG
    output_file = os.path.join(output_dir, f'page_{page_num + 1:02d}.png')
    pix.save(output_file)
    print(f"Saved page {page_num + 1}/{total_pages} to {output_file}")

pdf_document.close()
print(f"\nSuccessfully extracted {total_pages} pages!")
