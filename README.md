# Peripheral Forms - "We Should Be Allowed to Think" Exhibition

This repository contains two main components:

## 1. Open Call Site (`/open-call.html`)
The main submission portal for the exhibition. Static HTML page for the "Fall of Freedom" open call.

## 2. Exhibition Site (`/exhibition/`)
The interactive web-based art exhibition. This is a React + Vite application exploring pre-emptive control and tactical evasion through interactive mechanisms.

### Exhibition Setup & Development

```bash
cd exhibition
npm install
npm run dev
```

The exhibition will be available at `http://localhost:5173`

### Building for Production

```bash
cd exhibition
npm run build
```

Output will be in `exhibition/dist/`

### Directory Structure

```
/
├── open-call.html              # Main submission portal (live on root)
├── exhibition-site-plan.md     # Project specification & architecture
├── TODO.md                     # Implementation roadmap
└── exhibition/                 # Exhibition application (not live on root)
    ├── src/
    │   ├── components/         # React components
    │   ├── hooks/             # Custom React hooks
    │   ├── store/             # Zustand state management
    │   ├── styles/            # CSS modules and themes
    │   └── data/              # Static data (artworks, mechanisms)
    ├── public/                # Static assets
    │   └── artworks/          # Artwork files (PDFs, DOCS, images, videos)
    │       ├── lynch/         # Garrett Lynch IRL artwork files
    │       ├── weigel/        # Jennifer Weigel artwork files
    │       ├── gibbins/       # Ian Gibbins artwork files
    │       ├── desire_engineering/  # desire_engineering artwork files
    │       ├── perfect_users/       # Perfect Users artwork files
    │       └── search_engine_scores/  # [To be selected]
    ├── index.html             # Vite entry point
    ├── vite.config.js         # Vite configuration
    └── package.json           # Dependencies
```

### Artwork Files

The exhibition contains actual artwork files (PDFs, DOCS, images, videos, etc.) stored in the `/exhibition/public/artworks/` directory. Each artist has their own subdirectory for organizing their files.

**Current Artwork Files:**

- **Lynch** (`/artworks/lynch/`): Browser extension files (PDF, PNG, GIF, MP4)
- **Weigel** (`/artworks/weigel/`): Poetry document (DOCX)
- **Gibbins** (`/artworks/gibbins/`): Video hosted on Vimeo (embedded)
- **desire_engineering** (`/artworks/desire_engineering/`): 3 meme images (PNG)
- **perfect_users** (`/artworks/perfect_users/`): PDF with 15 collaborative artworks
- **search_engine_scores** (`/artworks/search_engine_scores/`): Work in progress

**Display Features:**

1. **Custom presentation** for each artwork type (images, videos, PDFs, documents)
2. **Download buttons** for browser extensions and documents
3. **Installation instructions** for Lynch's Chrome extension
4. **Image galleries** for multiple-image works
5. **PDF viewers** for collections
6. **Artist portfolio/website links** for all submissions

See `/exhibition/public/artworks/README.md` for detailed documentation.

### Deployment

To deploy without going live immediately:

1. Pull/deploy the entire repository
2. The exhibition site will be available at `/exhibition/`
3. Test locally on the server
4. When ready to go live, configure your web server to route requests appropriately

The open call site remains on the root (`/`) for continuous operation.

### Features

- **6 Interactive Mechanisms**: Each trapping an artwork behind a different control system
- **State Persistence**: Progress saved in browser localStorage
- **Progressive Infrastructure Visibility**: Surveillance apparatus becomes visible as mechanisms are solved
- **Theme Transformation**: Platform aesthetic shifts to "people's internet" brutalist design when all mechanisms solved
- **Real Tracking Data**: Mouse movements and scroll depth tracked (in-browser only)
- **Fully Responsive Design**: Optimized for desktop, tablet, and mobile devices with fluid typography and touch-friendly interactions
- **Testing Toggles**: Each artwork has a toggle button to manually mark it as solved/unsolved for testing purposes

### Technology Stack

- **Framework**: React 19 with Hooks
- **Build Tool**: Vite 7
- **Routing**: React Router v7
- **State Management**: Zustand with localStorage persistence
- **Styling**: CSS Modules + CSS Variables
- **Animations**: Framer Motion
- **Package Manager**: npm

### Current Status

**🎉 PRODUCTION READY** - Core exhibition functionality complete!

**✅ Phase 1: Core Architecture** - COMPLETE
- React 19 + Vite 7 setup with subdirectory routing (/exhibition/)
- Zustand store with localStorage persistence
- Full component architecture with theme switching
- Testing toggles for individual artwork solved states

**✅ Phase 2: All 6 Mechanisms** - COMPLETE
- Confirmshaming (Lynch)
- Autoplay/Countdown (Weigel)
- Time-Out (Gibbins)
- Infinite Scroll (desire_engineering)
- Surveillance UI (Perfect Users)
- Harmony Button (Search Engine Scores)

**✅ Phase 3: Infrastructure Visibility** - COMPLETE
- NetworkMonitor, DatabaseLog, ConsoleErrors components
- Progressive visibility based on solved mechanisms

**✅ Phase 5: Ending State** - COMPLETE
- LiberatedLayout with "people's internet" brutalist aesthetic
- Theme transformation when all mechanisms solved

**✅ Phase 4: Artwork Integration** - COMPLETE
- ArtworkPage component built with comprehensive file display support
- ✅ All 6 artist submissions integrated from open call responses
- ✅ Complete artist statements and descriptions added to artworks.js
- ✅ Artist-specific color themes redesigned based on artistic content
- ✅ Video embeds for Vimeo/YouTube submissions (responsive 16:9 aspect ratio)
- ✅ Thematic statements and presentation notes displayed on artwork pages
- ✅ Lynch: Browser extension with download links and installation instructions
- ✅ Weigel: Document download (DOCX poem)
- ✅ Gibbins: Vimeo video embed
- ✅ desire_engineering: Multi-image gallery (3 meme images)
- ✅ Perfect Users: PDF viewer with 15 collaborative artworks
- ✅ Search Engine Scores: Artist updated to Justice Alexander Hager
- ✅ Artist website/portfolio links added to all artworks

**📋 Phase 6: Testing & Polish** - IN PROGRESS
- ✅ Deployment to /exhibition/ subdirectory working
- ✅ Mobile responsiveness (fluid typography, 3 breakpoints: 768px, 640px, 480px)
- ⏳ Cross-browser testing
- ⏳ Performance optimization
- ⏳ Accessibility improvements
