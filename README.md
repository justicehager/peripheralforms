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

### Technology Stack

- **Framework**: React 18 with Hooks
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Zustand with localStorage persistence
- **Styling**: CSS Modules + CSS Variables
- **Animations**: Framer Motion
- **Package Manager**: npm

### Current Status

Phase 1 architecture complete with:
- ✅ Core React + Vite setup
- ✅ Zustand store with persistence
- ✅ Component architecture
- ✅ Infrastructure monitoring panels
- ✅ First mechanism (Confirmshaming) implemented
- 🚧 Remaining 5 mechanisms in progress
