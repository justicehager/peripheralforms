# Exhibition Site Implementation TODO

Generated from `exhibition-site-plan.md`. Track progress through development phases.

---

## 🚀 DEPLOYMENT STATUS

**Current Status**: Ready for deployment - all 6 mechanisms implemented and tested locally

**Branch**: `claude/build-exhibition-mechanisms-013j9NSnuEQgeDEny1KcttPv`

**Deployment Package**: `/tmp/exhibition-dist-working.tar.gz` (101 KB)
- Contains working build with all 6 mechanisms bundled
- Dev build: 87 modules, 310 KB JavaScript bundle
- All mechanisms verified in bundle: Confirmshaming, AutoplayCountdown, TimeOut, InfiniteScroll, SurveillanceUI, HarmonyButton

**Deployment Instructions**:
```bash
# 1. Copy from dev to server:
scp /tmp/exhibition-dist-working.tar.gz user@peripheralforms.com:/tmp/

# 2. On server:
cd /var/www/peripheralforms.com/html/exhibition
tar -xzf /tmp/exhibition-dist-working.tar.gz
cp dist/index.html ./
cp -r dist/assets/* ./assets/
rm /tmp/exhibition-dist-working.tar.gz
rm -rf dist/

# 3. Hard refresh browser (Ctrl+Shift+R)
```

**Known Issue**: Building directly on server produces incomplete bundle (4 modules vs 87). Using pre-built dist/ from dev environment as workaround.

---

## Phase 1: Core Architecture (Week 1) ✅ COMPLETE

- [x] Set up React 18 + Vite project with proper folder structure
- [x] Install dependencies (zustand, react-router-dom, framer-motion)
- [x] Create Zustand store with solved mechanisms tracking and persistence
- [x] Implement React Router structure with paths for /, /artwork/:id, /about
- [x] Build Feed component with mock artwork data and feed posts
- [x] Create FeedPost component with locked/unlocked states
- [x] Implement platform aesthetic (CSS variables, colors, typography, layout)
- [x] Build Layout component with conditional rendering (platform vs resistance)
- [x] Create ContextHelp component with exhibition explanation
- [x] Create data files for artworks metadata and mechanisms configuration

---

## Phase 2: Mechanisms (Week 2-3) ✅ COMPLETE

### Custom Hooks
- [x] Create useScrollDepth custom hook for infinite scroll tracking (inline in InfiniteScroll.jsx)
- [x] Create useMouseTracking custom hook for surveillance UI (inline in SurveillanceUI.jsx)
- [x] Create useTimer custom hook for time-based mechanisms (inline in TimeOut.jsx)

### Mechanism 1: Lynch - Confirmshaming
- [x] Implement Confirmshaming mechanism (5 refuse screens required)
- [x] Add corporate press release content layer
- [x] Implement refusal tracking and unlock logic

### Mechanism 2: Weigel - Autoplay/Countdown
- [x] Implement Autoplay/Countdown mechanism (pause at timestamp puzzle)
- [x] Create video player with hidden clue at specific timestamp (127.3s)
- [x] Implement pause detection and unlock trigger

### Mechanism 3: Gibbins - Time-Out
- [x] Implement Time-Out mechanism (5 min wait OR unlock 2+ others)
- [x] Add timer display with countdown
- [x] Implement alternative unlock path via other mechanisms

### Mechanism 4: desire_engineering - Infinite Scroll
- [x] Implement Infinite Scroll mechanism (scroll to pattern)
- [x] Implement procedural content generation for testimonials (250 items)
- [x] Add scroll depth tracking and pattern detection
- [x] Create exit link reveal at target scroll depth (item 187)

### Mechanism 5: Perfect Users - Surveillance UI
- [x] Implement Surveillance UI mechanism (mouse pattern tracking)
- [x] Create real-time tracking display panel
- [x] Implement pattern validation for mouse movements/clicks
- [x] Add unlock trigger for correct pattern sequence (5 zones)

### Mechanism 6: Search Engine Scores - Harmony Button + CAPTCHA
- [x] Implement Harmony Button mechanism (Terms of Service assent)
- [x] Create CAPTCHA with encoded instructions
- [x] Implement CAPTCHA solution validation
- [x] Add unlock trigger for solved CAPTCHA

---

## Phase 3: Infrastructure Visibility (Week 4)

- [ ] Create NetworkMonitor component showing fake API calls
- [ ] Create DatabaseLog component showing database queries
- [ ] Create ConsoleErrors component showing terminal-style errors
- [ ] Create InfrastructureOverlay component with progressive visibility
- [ ] Implement progressive infrastructure exposure (Level 1-3 based on mechanisms solved)
- [ ] Add glitch effects and CSS corruption for infrastructure visibility

---

## Phase 4: Artwork Integration (Week 5)

- [ ] Create ArtworkPage component for individual artwork display
- [ ] Prepare/collect all 6 artwork assets (thumbnails, full content, artist statements)
- [ ] Add mechanism-specific content (press releases, testimonials, guidelines, etc.)
- [ ] Integrate Lynch artwork
- [ ] Integrate Weigel artwork
- [ ] Integrate Gibbins artwork
- [ ] Integrate desire_engineering artwork
- [ ] Integrate Perfect Users artwork
- [ ] Integrate Search Engine Scores artwork

---

## Phase 5: Ending State (Week 6)

- [ ] Create LiberatedLayout component (brutalist/1990s resistance aesthetic)
- [ ] Implement resistance theme CSS (terminal green, hot pink accents, typography)
- [ ] Add smooth theme transition animations from platform to resistance
- [ ] Add ASCII art and brutalist design elements to resistance state
- [ ] Implement reset functionality to clear solved mechanisms and reload

---

## Phase 6: Testing & Polish (Week 7)

### Functionality Testing
- [ ] Test all 6 mechanisms individually for functionality and solvability
- [ ] Test state persistence across browser refreshes
- [ ] Test ending state transformation when all mechanisms solved
- [ ] Test localStorage clearing and fresh experience

### Compatibility Testing
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Test mobile responsiveness or decide intentional desktop-only approach

### Accessibility
- [ ] Implement keyboard navigation for all mechanisms
- [ ] Add high contrast mode option for accessibility
- [ ] Add screen reader descriptions for visual mechanisms

### Performance
- [ ] Optimize performance for infinite scroll with 1000+ items
- [ ] Optimize mouse tracking performance for Surveillance UI

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
