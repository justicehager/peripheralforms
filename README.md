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
    ├── index.html             # Vite entry point
    ├── vite.config.js         # Vite configuration
    └── package.json           # Dependencies
```

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

**🚧 Phase 4: Artwork Integration** - PARTIAL
- ArtworkPage component built
- Need actual artwork assets (images, videos, PDFs)
- Need artist statements and complete descriptions

**📋 Phase 6: Testing & Polish** - IN PROGRESS
- ✅ Deployment to /exhibition/ subdirectory working
- ✅ Mobile responsiveness (fluid typography, 3 breakpoints: 768px, 640px, 480px)
- ⏳ Cross-browser testing
- ⏳ Performance optimization
- ⏳ Accessibility improvements
