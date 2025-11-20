# Deployment Instructions

## Structure

The site has two parts:
1. **Open Call Site**: Root level (`/`)
2. **Exhibition Site**: Subdirectory (`/exhibition/`)

## Deployment Options

### Option A: Deploy Entire Repository

If deploying the entire repository to your web root:

1. Ensure `.htaccess` is in the repository root
2. Copy `exhibition/dist/` contents to a live `/exhibition/` directory
3. The root `.htaccess` will handle SPA routing for `/exhibition/*` URLs

### Option B: Deploy Built Files Only

If deploying only production files:

```
/ (web root)
  ├── index.html              (from repository root - open call site)
  ├── .htaccess               (from repository root - handles routing)
  ├── _redirects              (from repository root - for Netlify/CF Pages)
  └── exhibition/             (copy contents of exhibition/dist/ here)
      ├── index.html
      ├── .htaccess
      ├── _redirects
      └── assets/
```

## Server Configuration

### Apache
The `.htaccess` files are already configured. Just ensure `mod_rewrite` is enabled.

### Netlify / Cloudflare Pages
Use the `_redirects` file in the root.

### Nginx
Add to your nginx config:

```nginx
location /exhibition {
    try_files $uri $uri/ /exhibition/index.html;
}
```

### GitHub Pages
GitHub Pages doesn't support server-side redirects for SPAs in subdirectories well.
Consider using hash router or deploying to root.

## Testing

After deployment, test these URLs:
- `/` - Should load open call site
- `/exhibition/` - Should load exhibition feed
- `/exhibition/artwork/lynch` - Should load artwork page (not 404)
- Refresh on `/exhibition/artwork/lynch` - Should still work (not 404)

## Troubleshooting

**404 errors on direct navigation:**
- Check that `.htaccess` or `_redirects` is in the correct location
- Verify server has mod_rewrite enabled (Apache)
- Check server error logs for rewrite issues

**Assets not loading:**
- Verify the exhibition files are in `/exhibition/` not `/exhibition/dist/`
- Check browser console for 404s on asset files
