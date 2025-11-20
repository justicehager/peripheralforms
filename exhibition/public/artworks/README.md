# Artworks Directory

This directory contains the actual artwork files (PDFs, DOCS, images, videos, etc.) for the "We Should Be Allowed to Think" exhibition.

## Directory Structure

Each artist has their own subdirectory:

```
artworks/
├── lynch/                      # Garrett Lynch IRL - "Restoring a Name to Grate American Honor"
├── weigel/                     # Jennifer Weigel - "Interrogation"
├── gibbins/                    # Ian Gibbins - "ISOLATION PROCEDURES"
├── desire_engineering/         # desire_engineering - "Starter Questions for 21st Century Grovelers"
├── perfect_users/              # Perfect Users - "Perfect Censorship // Perfectly Unpublished"
└── search_engine_scores/       # [To be selected]
```

## File Types

This directory can contain:
- **PDFs** - Documents, artist statements, text-based works
- **DOCS** - Word documents, text files
- **Images** - JPG, PNG, GIF, etc. for visual artworks
- **Videos** - MP4, WebM, etc. (though larger videos should use external hosting like Vimeo/YouTube)
- **Audio** - MP3, WAV, etc. for sound works
- **Other formats** - Any other digital artwork formats

## File Organization

Each artist folder can contain:
- `thumbnail.jpg` or `thumbnail.png` - Thumbnail image for the feed
- `content/` - Subdirectory for the main artwork files
- Any additional files organized as needed

## Accessing Files

Files in this directory are served statically and can be referenced in the application with paths like:
- `/artworks/lynch/thumbnail.jpg`
- `/artworks/weigel/content/poem.pdf`
- etc.

Note: The base path is `/exhibition/` in production, so full URLs will be `/exhibition/artworks/...`

## Adding New Artwork

1. Create or navigate to the artist's subdirectory
2. Add artwork files (PDF, DOC, images, etc.)
3. Add a thumbnail image if needed (thumbnail.jpg or thumbnail.png)
4. Update the artwork metadata in `src/data/artworks.js` to reference the files
5. Ensure file sizes are reasonable for web delivery (compress if necessary)

## Important Notes

- Files placed in `/exhibition/public/` are copied to the build output as-is
- Keep file sizes reasonable for web delivery
- Use descriptive filenames
- For large video files, prefer external hosting (Vimeo, YouTube) with embeds
- All paths are relative to the `/exhibition/` base URL in production
