# Per-Mechanism Theming Guide

## Overview

Each mechanism overlay can have its own unique visual style and aesthetic. This is controlled through a centralized theming system that applies mechanism-specific CSS classes to overlay components.

## Architecture

### 1. Theme Configuration (`/src/data/mechanismThemes.js`)

This file maps each mechanism ID to a theme configuration:

```javascript
export const MECHANISM_THEMES = {
  'confirmshaming': {
    name: 'political-poll',
    className: 'theme-political-poll',
    description: 'Aggressive online political poll aesthetic'
  },
  'autoplay': {
    name: 'default',
    className: 'theme-default',
    description: 'Default overlay theme'
  },
  // ... etc
}
```

### 2. Theme Application (`MechanismOverlay.jsx`)

The overlay component automatically applies the theme class:

```javascript
const theme = getMechanismTheme(artwork.mechanismId)

<div className={`${styles.content} ${theme.className}`}>
  {/* overlay content */}
</div>
```

### 3. Theme Styles (`MechanismOverlay.module.css`)

Theme-specific styles are defined using CSS Module global selectors:

```css
.content:global(.theme-political-poll) {
  /* Override overlay container styles */
}

.content:global(.theme-political-poll) .header {
  /* Override header styles */
}
```

## Creating a New Theme

### Step 1: Define Theme in Configuration

Edit `/src/data/mechanismThemes.js`:

```javascript
export const MECHANISM_THEMES = {
  'your-mechanism-id': {
    name: 'your-theme-name',
    className: 'theme-your-theme-name',
    description: 'Description of the aesthetic'
  }
}
```

### Step 2: Add Theme Styles

Add styles to `/src/components/Mechanisms/MechanismOverlay.module.css`:

```css
/* ============================================
   YOUR THEME NAME
   Description of aesthetic
   ============================================ */

.content:global(.theme-your-theme-name) {
  /* Customize overlay background, border, etc */
}

.content:global(.theme-your-theme-name) .header {
  /* Customize header section */
}

.content:global(.theme-your-theme-name) .thumbnail {
  /* Customize emoji/thumbnail container */
}

.content:global(.theme-your-theme-name) .info h2 {
  /* Customize artwork title */
}

.content:global(.theme-your-theme-name) .artist {
  /* Customize artist name */
}

.content:global(.theme-your-theme-name) .description {
  /* Customize description text */
}

.content:global(.theme-your-theme-name) .mechanismContainer {
  /* Customize mechanism content area */
}

.content:global(.theme-your-theme-name) .closeButton {
  /* Customize close button */
}
```

### Step 3: (Optional) Style Individual Mechanism Component

You can also add theme-specific styles to the mechanism's own CSS module:

Edit `/src/components/Mechanisms/YourMechanism.module.css` to add styles that complement the overlay theme.

## Available Style Targets

When creating themes, you can target these elements:

### Overlay Structure
- `.content` - Main overlay container
- `.overlay` - Background overlay (backdrop)
- `.header` - Header section containing thumbnail and info
- `.mechanismContainer` - Content area where mechanism renders
- `.closeButton` - Close button (X)

### Header Elements
- `.thumbnail` - Emoji/thumbnail container
- `.info` - Info section container
- `.info h2` - Artwork title
- `.artist` - Artist name
- `.description` - Artwork description

## Example Themes

### Political Poll Theme (Confirmshaming)

**Aesthetic**: Aggressive online political poll
**Colors**: Red (#d62828), Blue (#003f88), Gold (#ffd60a)
**Features**:
- Patriotic color scheme (red/white/blue)
- Urgent, uppercase typography
- Pulsing/animated elements
- Shimmer effects
- Stars and stripes motifs

**Key Techniques**:
- Gradient backgrounds
- CSS animations (shimmer, pulse)
- Text shadows for depth
- Border glows
- Pseudo-elements for decorative effects

### Ideas for Other Mechanisms

**Autoplay/Countdown** - Video player/streaming service aesthetic
- Dark theme with video player controls
- Sleek, modern interface
- Progress bars and timestamps
- Netflix/YouTube inspired

**Time-Out** - Clinical/waiting room aesthetic
- Sterile white/gray colors
- Sans-serif institutional fonts
- Minimalist, bureaucratic design
- Clock/timer motifs

**Infinite Scroll** - Testimonial/review site aesthetic
- User-generated content styling
- Star ratings visual language
- Review card patterns
- Endless feed appearance

**Surveillance UI** - Security camera/monitoring aesthetic
- Green terminal text
- Scan lines and glitch effects
- Technical/data visualization style
- CCTV/monitoring station look

**Harmony Button** - Terms of Service/Legal aesthetic
- Dense text blocks
- Checkbox and form styling
- Corporate/legal document appearance
- Fine print visual language

## Best Practices

1. **Stay Thematic**: Ensure visual style reinforces the mechanism's conceptual meaning
2. **Maintain Readability**: Even aggressive themes should be legible
3. **Use Animations Sparingly**: Enhance but don't distract from content
4. **Test Accessibility**: Ensure sufficient contrast and keyboard navigation
5. **Keep It Modular**: Use the global selector pattern to avoid conflicts
6. **Document Your Choices**: Add comments explaining the aesthetic decisions

## Technical Notes

- All themes use CSS Modules with `:global()` selector for scoping
- Animations are defined inline with `@keyframes` in the same section
- CSS variables from the main theme (e.g., `var(--spacing-xl)`) remain available
- Themes can override or extend the default overlay styles
- Each theme is completely independent - no cascading between themes
