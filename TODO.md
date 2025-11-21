# Exhibition Site Implementation TODO

Generated from `exhibition-site-plan.md`. Track progress through development phases.

---

## Phase 1: Core Architecture (Week 1)

- [x] Set up React 18 + Vite project with proper folder structure
- [x] Install dependencies (zustand, react-router-dom, framer-motion)
- [x] Create Zustand store with solved mechanisms tracking and persistence
- [x] Implement React Router structure with paths for /, /artwork/:id, /about
- [x] Build Feed component with mock artwork data and feed posts
- [x] Create FeedPost component with locked/unlocked states (now with thumbnails!)
- [x] Implement platform aesthetic (CSS variables, colors, typography, layout)
- [x] Build Layout component with conditional rendering (platform vs resistance)
- [x] Create ContextHelp component with exhibition explanation
- [x] Create data files for artworks metadata and mechanisms configuration
- [x] **NEW**: Created MechanismOverlay modal component for better UX
- [x] **NEW**: Added emoji thumbnails to all artworks
- [x] **NEW**: Added testing toggles to manually mark artworks as solved/unsolved

---

## Phase 2: Mechanisms (Week 2-3)

### Custom Hooks
- [x] Create useScrollDepth custom hook for infinite scroll tracking
- [x] Create useMouseTracking custom hook for surveillance UI
- [x] Create useTimer custom hook for time-based mechanisms

### Mechanism 1: Lynch - Confirmshaming
- [x] Implement Confirmshaming mechanism (5 refuse screens required)
- [x] Add corporate press release content layer
- [x] Implement refusal tracking and unlock logic

### Mechanism 2: Weigel - Autoplay/Countdown
- [x] Implement Autoplay/Countdown mechanism (pause at timestamp puzzle)
- [x] Create video player with hidden clue at specific timestamp
- [x] Implement pause detection and unlock trigger

### Mechanism 3: Gibbins - Time-Out
- [x] Implement Time-Out mechanism (5 min wait OR unlock 2+ others)
- [x] Add timer display with countdown
- [x] Implement alternative unlock path via other mechanisms

### Mechanism 4: desire_engineering - Infinite Scroll
- [x] Implement Infinite Scroll mechanism (scroll to pattern)
- [x] Implement procedural content generation for testimonials
- [x] Add scroll depth tracking and pattern detection
- [x] Create exit link reveal at target scroll depth

### Mechanism 5: Perfect Users - Surveillance UI
- [x] Implement Surveillance UI mechanism (mouse pattern tracking)
- [x] Create real-time tracking display panel
- [x] Implement pattern validation for mouse movements/clicks
- [x] Add unlock trigger for correct pattern sequence

### Mechanism 6: Search Engine Scores - Harmony Button + CAPTCHA
- [x] Implement Harmony Button mechanism (Terms of Service assent)
- [x] Create CAPTCHA with encoded instructions
- [x] Implement CAPTCHA solution validation
- [x] Add unlock trigger for solved CAPTCHA

---

## Phase 3: Infrastructure Visibility (Week 4) - REMOVED

- [x] ~~Create DatabaseLog component showing database queries~~ - REMOVED from codebase
- [x] ~~Create ConsoleErrors component showing terminal-style errors~~ - REMOVED from codebase
- [x] ~~Create InfrastructureOverlay component with progressive visibility~~ - REMOVED from codebase
- [x] ~~Implement progressive infrastructure exposure (Level 1-2 based on mechanisms solved)~~ - REMOVED from codebase
- [x] ~~Add glitch effects and CSS corruption for infrastructure visibility~~ - REMOVED from codebase

**Note:** All infrastructure visibility components (DatabaseLog, ConsoleErrors, InfrastructureOverlay) and console.log statements have been removed from the codebase.

---

## Phase 4: Artwork Integration (Week 5) - **COMPLETE**

- [x] Create ArtworkPage component for individual artwork display
- [x] Prepare/collect all 6 artwork assets (thumbnails, full content, artist statements)
- [x] Add mechanism-specific content (press releases, testimonials, guidelines, etc.)
- [x] Implement custom display for each artwork type:
  - [x] Lynch: Browser extension with installation instructions and download button
  - [x] Weigel: Document download link for poetry (DOCX)
  - [x] Gibbins: Vimeo video embed (16:9 responsive)
  - [x] desire_engineering: Multi-image gallery (3 meme images)
  - [x] Perfect Users: Image gallery with 15 collaborative artworks
  - [x] Search Engine Scores: Placeholder for Justice Alexander Hager's work
- [x] Add artist portfolio/website links for all artworks
- [x] Style all presentation types with responsive CSS
- [x] Integrate Lynch artwork - **COMPLETE** (Garrett Lynch IRL - "Restoring a Name to Grate American Honor" - Browser extension with download & installation instructions)
- [x] Integrate Weigel artwork - **COMPLETE** (Jennifer Weigel - "Interrogation" - Poetry document download)
- [x] Integrate Gibbins artwork - **COMPLETE** (Ian Gibbins - "ISOLATION PROCEDURES" - Vimeo video embed)
- [x] Integrate desire_engineering artwork - **COMPLETE** (desire_engineering - "Starter Questions for 21st Century Grovelers" - 3-image gallery)
- [x] Integrate Perfect Users artwork - **COMPLETE** (Perfect Users - "Perfect Censorship // Perfectly Unpublished" - Image gallery with 15 artworks)
- [x] Integrate Search Engine Scores artwork - **COMPLETE** (Justice Alexander Hager - "Search Engine Scores" - Interactive search queries with Google links, gallery shadowbox style with thumbnail grid and ImageLightbox navigation, improved text contrast across exhibition)

---

## Phase 5: Ending State (Week 6)

- [x] Create LiberatedLayout component (brutalist/1990s resistance aesthetic)
- [x] Implement resistance theme CSS (terminal green, hot pink accents, typography)
- [x] Add smooth theme transition animations from platform to resistance
- [x] Add ASCII art and brutalist design elements to resistance state
- [x] Implement reset functionality to clear solved mechanisms and reload

---

## Phase 6: Testing & Polish (Week 7)

### Bug Fixes
- [x] **Fixed Autoplay/Countdown Race Condition** - Resolved critical DOM error in AutoplayCountdown component where YouTube IFrame API was attempting to manipulate the DOM after React component unmounted. Added mount tracking, initialization delays, and proper cleanup to prevent "insertBefore" errors.
- [x] **Fixed Artwork Page 404 Errors on Reload** - Added comprehensive SPA routing configuration:
  - Root-level `.htaccess` and `_redirects` files for proper /exhibition/ subdirectory handling
  - Fallback `404.html` for GitHub Pages compatibility
  - Created `DEPLOYMENT.md` with detailed deployment instructions for various hosting platforms (Apache, Nginx, Netlify, Cloudflare Pages, GitHub Pages)
  - Direct navigation and page reloads now work correctly for artwork URLs
- [x] **Fixed Mechanism Layout Issues** - Removed excessive `min-height` values causing unnecessary black space and scrollbars in mechanism overlays. Mechanisms now fit content naturally without forced spacing.

### Functionality Testing
- [ ] Test all 6 mechanisms individually for functionality and solvability
- [ ] Test state persistence across browser refreshes
- [ ] Test ending state transformation when all mechanisms solved
- [ ] Test localStorage clearing and fresh experience

### Compatibility Testing
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [x] Mobile responsiveness - COMPLETE (fluid typography, 3 breakpoints: 768px, 640px, 480px)

### Accessibility
- [ ] Implement keyboard navigation for all mechanisms
- [ ] Add high contrast mode option for accessibility
- [ ] Add screen reader descriptions for visual mechanisms

### Performance
- [x] Optimize performance for infinite scroll with 1000+ items - **COMPLETE** (Added throttling to scroll handler, reduced re-renders, passive event listeners)
- [x] Optimize mouse tracking performance for Surveillance UI - **COMPLETE** (Throttled mousemove to 50ms, reduced store updates, optimized hover tracking)

### Documentation
- [ ] Write utility functions for puzzle solution validation
- [ ] Document codebase and code comments for complex puzzle logic

### Final Review
- [ ] Final review and testing of complete exhibition flow

---

## Notes

- **State Management**: All solved mechanisms tracked in Zustand with localStorage persistence
- **Architecture**: Component-based with isolation of each mechanism
- **Progressive Enhancement**: Basic functionality first, then visual polish and optimizations
- **Content**: Some assets may be placeholders initially; update as content becomes available
- **Performance**: Mouse tracking and infinite scroll are performance-critical; optimize early

---

## Success Criteria (From Plan)

✅ All 6 mechanisms are functional and solvable
✅ Infrastructure visibility increases as mechanisms are solved
✅ Ending state fully transforms aesthetic
✅ State persists across browser refreshes
✅ Context/help page clearly explains exhibition
✅ Experience is comprehensible without instructions (discoverability)
✅ Site performs the thesis (reveals hidden infrastructure)
✅ Works in Chrome/Firefox/Safari
✅ Accessible via keyboard navigation
✅ Artwork content is properly displayed
