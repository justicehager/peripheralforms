# "We Should Be Allowed to Think" - Exhibition Website Implementation Plan

## Project Overview

### Concept
A web-based art exhibition exploring pre-emptive control and tactical evasion in contemporary authoritarianism. The site itself is the exhibition space, presenting 6 artworks each initially trapped behind different attention-capture/authoritarian control mechanisms. Visitors must solve puzzles to disable each mechanism and access the artworks.

### Core Experience Arc
1. **Initial State**: Polished social media platform simulation
2. **Progressive Liberation**: As mechanisms are solved, surveillance infrastructure becomes visible, platform facade fractures
3. **Ending State**: All 6 artworks unlocked reveals "people's internet" aesthetic - early web/tactical media/digital garden/brutalist resistance aesthetic

### Key Principles
- Mechanisms map **ironically** to artwork themes (not directly)
- Each mechanism requires puzzle-solving (not simple "disable" buttons)
- No required sequence - visitors choose their path
- Real surveillance tracking in code (for mechanism #5)
- Site performs its thesis: beating back platform manipulation

---

## Technical Architecture

### Tech Stack
- **Framework**: React 18+ with Vite
- **Routing**: React Router v6
- **State Management**: Zustand (lightweight, perfect for unlock states)
- **Styling**: CSS Modules + CSS Variables for theme switching
- **Animations**: Framer Motion for state transitions
- **Build Tool**: Vite (fast HMR, excellent DX)

### Why This Stack
- Component-based architecture maps perfectly to mechanism/artwork structure
- Zustand provides simple global state for tracking solved mechanisms
- Framer Motion enables smooth transitions between platform/resistance aesthetics
- Vite's speed essential for iterative aesthetic development
- All choices optimize for rapid prototyping while maintaining production quality

---

## File Structure

```
/exhibition-site/
├── public/
│   ├── artworks/           # Artwork images, videos, PDFs
│   │   ├── lynch/
│   │   ├── weigel/
│   │   ├── gibbins/
│   │   ├── desire-engineering/
│   │   ├── perfect-users/
│   │   └── search-engine-scores/
│   └── fonts/              # Custom fonts if needed
├── src/
│   ├── assets/
│   │   └── images/         # UI assets, icons
│   ├── components/
│   │   ├── Feed/
│   │   │   ├── Feed.jsx
│   │   │   ├── FeedPost.jsx
│   │   │   └── Feed.module.css
│   │   ├── Mechanisms/
│   │   │   ├── InfiniteScroll.jsx
│   │   │   ├── AutoplayCountdown.jsx
│   │   │   ├── CaptchaGate.jsx
│   │   │   ├── Confirmshaming.jsx
│   │   │   ├── SurveillanceUI.jsx
│   │   │   ├── HarmonyButton.jsx
│   │   │   └── [MechanismName].module.css
│   │   ├── Artworks/
│   │   │   ├── ArtworkPage.jsx
│   │   │   ├── Lynch.jsx
│   │   │   ├── Weigel.jsx
│   │   │   ├── Gibbins.jsx
│   │   │   ├── DesireEngineering.jsx
│   │   │   ├── PerfectUsers.jsx
│   │   │   ├── SearchEngineScores.jsx
│   │   │   └── [ArtworkName].module.css
│   │   ├── Infrastructure/
│   │   │   ├── DatabaseLog.jsx
│   │   │   ├── ConsoleErrors.jsx
│   │   │   └── InfrastructureOverlay.jsx
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Navigation.jsx
│   │   │   ├── ContextHelp.jsx
│   │   │   └── Layout.module.css
│   │   └── EndingState/
│   │       ├── LiberatedLayout.jsx
│   │       └── LiberatedLayout.module.css
│   ├── data/
│   │   ├── artworks.js      # Artwork metadata
│   │   └── mechanisms.js    # Mechanism configuration
│   ├── store/
│   │   └── useStore.js      # Zustand store
│   ├── hooks/
│   │   ├── useScrollDepth.js
│   │   ├── useMouseTracking.js
│   │   └── useTimer.js
│   ├── utils/
│   │   ├── surveillance.js   # Tracking utilities
│   │   └── validators.js     # Puzzle solution validators
│   ├── styles/
│   │   ├── global.css
│   │   ├── themes.css        # Platform vs Resistance themes
│   │   └── variables.css
│   ├── App.jsx
│   ├── main.jsx
│   └── routes.jsx
├── package.json
├── vite.config.js
└── README.md
```

---

## State Management (Zustand Store)

```javascript
// store/useStore.js
import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      // Solved mechanisms tracking
      solvedMechanisms: [],
      
      // Surveillance data (for mechanism #5)
      surveillanceData: {
        mouseMovements: [],
        scrollDepth: 0,
        timeOnSite: 0,
        clickPatterns: [],
      },
      
      // UI state
      infrastructureVisibility: 0, // 0-100, increases as mechanisms solved
      currentTheme: 'platform', // 'platform' or 'resistance'
      
      // Actions
      solveMechanism: (mechanismId) => {
        const solved = get().solvedMechanisms
        if (!solved.includes(mechanismId)) {
          set({
            solvedMechanisms: [...solved, mechanismId],
            infrastructureVisibility: ((solved.length + 1) / 6) * 100
          })
          
          // Check if all solved
          if (solved.length + 1 === 6) {
            set({ currentTheme: 'resistance' })
          }
        }
      },
      
      trackSurveillance: (data) => {
        set(state => ({
          surveillanceData: {
            ...state.surveillanceData,
            ...data
          }
        }))
      },
      
      resetExhibition: () => {
        set({
          solvedMechanisms: [],
          infrastructureVisibility: 0,
          currentTheme: 'platform',
          surveillanceData: {
            mouseMovements: [],
            scrollDepth: 0,
            timeOnSite: 0,
            clickPatterns: [],
          }
        })
      }
    }),
    {
      name: 'exhibition-state',
      partialPersist: (state) => ({
        solvedMechanisms: state.solvedMechanisms,
        currentTheme: state.currentTheme
      })
    }
  )
)
```

---

## Artwork & Mechanism Mappings

### 1. Lynch → Confirmshaming
**Artwork**: "Restoring a Name to Grate American Honor" (browser extension/naming power)

**Mechanism**: Multi-screen confirmshaming flow
- **Content Layer**: Corporate press releases celebrating "Gulf of America" rebrand
- **Puzzle**: Must choose "shameful" refusal option through 5+ screens
- **Solution Trigger**: Successfully refusing all 5 confirmshaming attempts
- **Irony**: Work about resisting imposed names trapped behind guilt-manipulation

**Implementation Notes**:
```javascript
// Track refusal selections
const [refusalCount, setRefusalCount] = useState(0)
const requiredRefusals = 5

// Confirmshaming button pairs
const options = [
  {
    accept: "I support renaming to Gulf of America",
    refuse: "No thanks, I don't respect national sovereignty"
  },
  {
    accept: "Yes, I want to be part of history",
    refuse: "I prefer living in the past"
  },
  // ... 3 more pairs
]
```

---

### 2. Weigel → Autoplay with Countdown
**Artwork**: "Interrogation" (poetry/testimony about police narratives)

**Mechanism**: Forced autoplay of official content with hidden clue
- **Content Layer**: Police press conference (video), official incident report, news coverage
- **Puzzle**: Must pause autoplay at exact moment (clue appears briefly at specific timestamp)
- **Solution Trigger**: Pausing at precise moment reveals password/code to unlock
- **Irony**: Testimony resisting predetermined narrative trapped behind forced official narrative

**Implementation Notes**:
```javascript
// Video with hidden timestamp clue
const clueTimestamp = 127.3 // seconds
const pauseWindow = 0.5 // acceptable margin

const handlePause = (currentTime) => {
  if (Math.abs(currentTime - clueTimestamp) < pauseWindow) {
    revealUnlockCode()
  }
}
```

---

### 3. Gibbins → Time Limits / Time-Out
**Artwork**: "ISOLATION PROCEDURES" (video/authoritarian environments)

**Mechanism**: Behavioral time restriction
- **Content Layer**: Wellness messaging about "healthy screen time," platform safety guidelines
- **Puzzle**: Initially shows countdown. Must leave site and return after specific interval (5 minutes? 10 minutes?)
- **Alternative**: Can unlock by solving 2+ other mechanisms first ("earn" your access)
- **Solution Trigger**: Timer completion OR 2+ other artworks unlocked
- **Irony**: Work about authoritarian control trapped behind paternalistic restriction

**Implementation Notes**:
```javascript
// Track initial visit timestamp
const [firstVisitTime, setFirstVisitTime] = useState(null)
const requiredWaitTime = 5 * 60 * 1000 // 5 minutes in ms

// Check if enough time passed OR other artworks solved
const canUnlock = () => {
  const timePassed = Date.now() - firstVisitTime >= requiredWaitTime
  const enoughSolved = solvedMechanisms.length >= 2
  return timePassed || enoughSolved
}
```

---

### 4. desire_engineering → Infinite Scroll
**Artwork**: "Starter Questions for 21st Century Grovelers" (CAPTCHA critique)

**Mechanism**: Endless scroll of AI-generated testimonials
- **Content Layer**: LinkedIn-style success stories, tech conference keynotes, "future of work" content (hundreds of procedurally generated items)
- **Puzzle**: Must scroll until pattern emerges (every 50th item? specific sequence of keywords?)
- **Solution Trigger**: Reaching specific scroll depth + recognizing pattern reveals exit link
- **Irony**: Critique of compulsory performance trapped behind compulsory scrolling

**Implementation Notes**:
```javascript
// Generate procedural testimonial content
const generateTestimonial = (index) => ({
  avatar: `generic-avatar-${index % 20}`,
  name: markovName(),
  title: `${randomRole()} at ${randomCompany()}`,
  content: templateFill(successStoryTemplates[index % templates.length])
})

// Track scroll depth
const { scrollDepth } = useScrollDepth()
const patternIndex = 237 // item where pattern/exit appears

useEffect(() => {
  if (scrollDepth > patternIndex) {
    revealExitLink()
  }
}, [scrollDepth])
```

---

### 5. Perfect Users → Surveillance Normalization UI
**Artwork**: "Perfect Censorship // Perfectly Unpublished" (withdrawal/privacy)

**Mechanism**: Maximum visibility surveillance interface
- **Content Layer**: Privacy policy, "data usage benefits," personalization features
- **Puzzle**: Interface tracks ALL user actions (mouse movements, hovers, clicks). Must perform specific tracked sequence to unlock
- **Solution Trigger**: Drawing specific pattern with mouse OR hovering over elements in correct order
- **Irony**: Work requiring privacy trapped behind maximum surveillance

**Implementation Notes**:
```javascript
// Real-time mouse tracking
const { mousePositions, recordClick } = useMouseTracking()

// Display tracking in UI
<SurveillancePanel>
  <div>Mouse Position: {x}, {y}</div>
  <div>Hover Time: {hoverDuration}ms</div>
  <div>Click Pattern: {clicks.join(' → ')}</div>
</SurveillancePanel>

// Pattern validation
const targetPattern = ['top-left', 'center', 'bottom-right', 'center']
const validatePattern = (recorded) => {
  return JSON.stringify(recorded) === JSON.stringify(targetPattern)
}
```

---

### 6. Search Engine Scores → Harmony Button + CAPTCHA Hybrid
**Artwork**: Your "Search Engine Scores" adaptation (phantom demand generation)

**Mechanism**: Forced assent to platform rules with instructions hidden in CAPTCHA
- **Content Layer**: Terms of Service, Acceptable Use Policy, Community Guidelines
- **Puzzle**: Must click "I Agree" to platform standards, but CAPTCHA to "prove you read them" contains actual score instructions encoded within
- **Solution Trigger**: Completing CAPTCHA reveals the score instructions for phantom API searches
- **Irony**: Work about fabricating demand trapped behind mandatory assent to platform rules

**Implementation Notes**:
```javascript
// CAPTCHA contains encoded instructions
const captchaText = "SEARCH transparency API labor conditions"
// Or image CAPTCHA where distorted text reveals search terms

// Must first click harmony button
const [agreedToTerms, setAgreedToTerms] = useState(false)

// Then solve CAPTCHA to get instructions
const handleCaptchaSolve = (decoded) => {
  if (decoded.includes('SEARCH')) {
    revealScoreInstructions(decoded)
  }
}
```

---

## Visual Design System

### Platform State (Initial)

**Colors**:
```css
:root[data-theme="platform"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #000000;
  --text-secondary: #65676b;
  --accent-blue: #1877f2;
  --border: #e4e6eb;
  --shadow: rgba(0, 0, 0, 0.1);
}
```

**Typography**:
- Primary: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI"
- Monospace (for infrastructure): "SF Mono", "Roboto Mono", Consolas

**Layout**:
- Max width: 640px (Instagram-like)
- Grid: 3 columns for feed
- Generous whitespace
- Rounded corners (8px)
- Subtle shadows

**Components**:
- Profile avatars (circular, 40px)
- Verification badges (blue checkmarks)
- Engagement counts (likes, shares visible)
- "Recommended for you" headers
- Algorithmic feed structure

### Infrastructure Exposure (Progressive)

**Level 1** (1-2 mechanisms solved, 17-33% infrastructure visibility):
- Occasional `<div>` tags visible in margins
- Database queries appear in margins
- Single console log message

**Level 2** (3-4 mechanisms solved, 50-67% infrastructure visibility):
- Database queries visible in margins
- Multiple console errors
- CSS occasionally "breaking"

**Level 3** (5-6 mechanisms solved, 83-100% infrastructure visibility):
- Full technical apparatus visible
- Multiple monitoring panels
- Code comments everywhere
- Platform facade barely holding
- Glitchy transitions

**Visual Elements**:
```jsx
// Infrastructure components appear based on visibility level
{infrastructureVisibility > 30 && <DatabaseLog />}
{infrastructureVisibility > 60 && <ConsoleErrors />}
```

**Styling for Infrastructure**:
```css
.infrastructure-panel {
  position: fixed;
  background: rgba(0, 0, 0, 0.9);
  color: #00ff00; /* terminal green */
  font-family: 'SF Mono', monospace;
  font-size: 11px;
  padding: 8px;
  border: 1px solid #333;
  z-index: 9999;
}

.database-query {
  opacity: 0.7;
  font-size: 10px;
  color: #888;
  font-family: monospace;
  margin-left: 20px;
  transform: rotate(-2deg);
}
```

### Resistance State (Ending)

**Colors**:
```css
:root[data-theme="resistance"] {
  --bg-primary: #000000;
  --bg-secondary: #1a1a1a;
  --text-primary: #00ff00; /* terminal green */
  --text-secondary: #00cc00;
  --accent: #ff00ff; /* hot pink */
  --border: #333333;
  --link: #00ffff; /* cyan */
}
```

**Typography**:
- System fonts: Times New Roman, Georgia, serif
- Monospace: Courier New
- Multiple font sizes (brutalist mixing)
- Underlined links
- All caps headers

**Layout**:
- Full width (no max-width constraint)
- Asymmetric layouts
- Dense text
- Visible borders/tables
- <hr> dividers
- List-based navigation
- No images except artwork

**Aesthetic References**:
- Geocities/Angelfire 1990s aesthetic
- Brutalist web design
- Indymedia/activist sites
- Digital gardens (backlinks, wiki-style)
- ASCII art borders
- Tilde.club/Neocities
- Tactical media manifestos

**Example HTML Structure**:
```html
<div class="resistance-layout">
  <header>
    <h1>WE SHOULD BE ALLOWED TO THINK</h1>
    <marquee>Liberation achieved. Platform defeated.</marquee>
  </header>
  
  <nav>
    <ul>
      <li><a href="#artworks">→ ARTWORKS</a></li>
      <li><a href="#about">→ ABOUT</a></li>
      <li><a href="#reset">→ RESET EXHIBITION</a></li>
    </ul>
  </nav>
  
  <main>
    <table border="1">
      <tr>
        <td><a href="/lynch">Lynch - Naming Power</a></td>
        <td>UNLOCKED</td>
      </tr>
      <!-- ... more rows -->
    </table>
  </main>
  
  <footer>
    <pre>
    ╔════════════════════════════╗
    ║  A people's internet       ║
    ║  is possible               ║
    ╚════════════════════════════╝
    </pre>
  </footer>
</div>
```

---

## Component Specifications

### Feed Component

```jsx
// components/Feed/Feed.jsx
import { useStore } from '../../store/useStore'
import FeedPost from './FeedPost'
import InfrastructureOverlay from '../Infrastructure/InfrastructureOverlay'

export default function Feed() {
  const { solvedMechanisms, infrastructureVisibility } = useStore()
  
  return (
    <div className="feed-container">
      <InfrastructureOverlay visibility={infrastructureVisibility} />
      
      <div className="feed-header">
        <h1>Recommended for You</h1>
        <p>Curated exhibition content</p>
      </div>
      
      <div className="feed-grid">
        {ARTWORKS.map(artwork => (
          <FeedPost 
            key={artwork.id}
            artwork={artwork}
            isUnlocked={solvedMechanisms.includes(artwork.mechanismId)}
          />
        ))}
      </div>
    </div>
  )
}
```

### FeedPost Component

```jsx
// components/Feed/FeedPost.jsx
export default function FeedPost({ artwork, isUnlocked }) {
  return (
    <article className="feed-post">
      <div className="post-header">
        <img src={artwork.avatar} className="avatar" />
        <div>
          <h3>{artwork.artistName}</h3>
          <p className="verified">✓ Verified Artist</p>
        </div>
      </div>
      
      <div className="post-content">
        {isUnlocked ? (
          <Link to={`/artwork/${artwork.id}`}>
            <img src={artwork.thumbnail} alt={artwork.title} />
            <div className="unlocked-badge">🔓 Unlocked</div>
          </Link>
        ) : (
          <div className="locked-mechanism">
            <MechanismComponent type={artwork.mechanismType} />
          </div>
        )}
      </div>
      
      <div className="post-footer">
        <div className="engagement">
          <span>❤️ {artwork.likes}</span>
          <span>💬 {artwork.comments}</span>
          <span>🔄 {artwork.shares}</span>
        </div>
      </div>
    </article>
  )
}
```


---

## Context/Help Page

### Content Structure

```markdown
# We Should Be Allowed to Think

## What is this?

This is not a traditional exhibition website. It is an exhibition that exists only online, exploring how digital platforms capture attention and pre-empt thought before it can form.

Six artworks are trapped behind different attention-capture mechanisms used by social media platforms and authoritarian systems. To experience the art, you must solve puzzles to disable each mechanism.

## How it works

1. **Choose your path**: Select any artwork to engage with (no required order)
2. **Encounter the mechanism**: Each work is initially obscured by a different control system
3. **Solve the puzzle**: Each mechanism requires active problem-solving (not simple clicking)
4. **Unlock the artwork**: Successfully solving reveals the artist's work
5. **Watch the transformation**: As you solve more mechanisms, the platform facade breaks down, revealing its surveillance infrastructure
6. **Reach liberation**: Solving all 6 mechanisms transforms the site into a "people's internet" aesthetic

## The Artists

- **Garrett Lynch** - "Restoring a Name to Grate American Honor"
- **Jennifer Weigel** - "Interrogation"
- **Ian Gibbins** - "ISOLATION PROCEDURES"
- **desire_engineering** - "Starter Questions for 21st Century Grovelers"
- **Perfect Users** - "Perfect Censorship // Perfectly Unpublished"
- **[Your Name]** - "Search Engine Scores"

## The Concept

This exhibition explores **pre-emptive control** - how contemporary authoritarianism operates not by silencing speech after it occurs, but by engineering consciousness before thought can form. The artworks respond with **tactical evasion** - strategies that resist predetermined narratives, imposed naming, attention infrastructure, and compulsory performance.

The website itself performs this thesis: it looks like a normal social platform, but reveals its control mechanisms as you actively resist them.

## Technical Note

This site tracks your behavior (scroll depth, mouse movements, time spent) as part of one of the mechanisms. This data is stored only in your browser and is never transmitted anywhere. It exists solely to make visible the normally invisible surveillance that occurs on every platform you use.

## Reset

You can reset the exhibition at any time to experience it fresh. Your progress is saved in your browser.
```

---

## Routing Structure

```jsx
// routes.jsx
import { createBrowserRouter } from 'react-router-dom'
import Feed from './components/Feed/Feed'
import ArtworkPage from './components/Artworks/ArtworkPage'
import ContextHelp from './components/Layout/ContextHelp'
import LiberatedLayout from './components/EndingState/LiberatedLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Feed />
      },
      {
        path: 'artwork/:artworkId',
        element: <ArtworkPage />
      },
      {
        path: 'about',
        element: <ContextHelp />
      }
    ]
  }
])

// Layout component conditionally renders platform or resistance chrome
function Layout() {
  const { currentTheme } = useStore()
  
  return currentTheme === 'resistance' ? (
    <LiberatedLayout>
      <Outlet />
    </LiberatedLayout>
  ) : (
    <PlatformLayout>
      <Outlet />
    </PlatformLayout>
  )
}
```

---

## Implementation Phases

### Phase 1: Core Architecture (Week 1)
- [ ] Set up React + Vite project
- [ ] Implement Zustand store with persistence
- [ ] Create basic routing structure
- [ ] Build Feed component with mock data
- [ ] Implement platform aesthetic (CSS)
- [ ] Create Context/Help page

### Phase 2: Mechanisms (Week 2-3)
- [ ] Implement Confirmshaming mechanism (Lynch)
- [ ] Implement Autoplay/Countdown mechanism (Weigel)
- [ ] Implement Time-Out mechanism (Gibbins)
- [ ] Implement Infinite Scroll mechanism (desire_engineering)
- [ ] Implement Surveillance UI mechanism (Perfect Users)
- [ ] Implement Harmony Button mechanism (Search Engine Scores)

### Phase 3: Infrastructure Visibility (Week 4)
- [ ] Create DatabaseLog component
- [ ] Create ConsoleErrors component
- [ ] Implement progressive exposure based on solve count
- [ ] Add glitch/corruption effects

### Phase 4: Artwork Integration (Week 5)
- [ ] Create ArtworkPage component
- [ ] Integrate all 6 artworks with proper content
- [ ] Implement artwork-specific layouts
- [ ] Add navigation between artworks

### Phase 5: Ending State (Week 6)
- [ ] Create LiberatedLayout component
- [ ] Implement resistance aesthetic (CSS)
- [ ] Add transition animation from platform to resistance
- [ ] Create ASCII art / brutalist elements
- [ ] Implement "reset" functionality

### Phase 6: Polish & Testing (Week 7)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness (or intentional desktop-only?)
- [ ] Performance optimization
- [ ] Accessibility considerations
- [ ] Documentation

---

## Development Priorities

### Must Have (MVP)
1. All 6 mechanisms functional
2. Solve state persistence
3. Infrastructure visibility progression
4. Ending state transformation
5. Context/help page

### Should Have
1. Smooth animations between states
2. Realistic fake API calls in network monitor
3. Procedurally generated content (for infinite scroll)
4. Mobile-responsive (or graceful degradation)

### Could Have
1. Sound design for mechanism interactions
2. Easter eggs in code comments
3. Konami code reset
4. Share functionality (ironic?)
5. Analytics (ironic?)

### Won't Have (For Prototype)
1. User accounts / authentication
2. Real backend / database
3. Multi-language support
4. Social sharing integrations

---

## Testing Considerations

### Mechanism Testing
- Each mechanism should have clear "solved" state
- Puzzles should be challenging but not impossible
- Provide subtle hints if user is stuck (after X time?)
- Test with fresh browser (no localStorage)

### State Persistence Testing
- Refresh page mid-mechanism
- Close/reopen browser
- Clear localStorage manually
- Multiple tabs open simultaneously

### Cross-Browser Testing
- Chrome (primary target)
- Firefox
- Safari
- Edge
- Mobile browsers (if responsive)

### Performance Testing
- Infinite scroll with 1000+ items
- Mouse tracking performance
- Multiple infrastructure panels rendering
- Theme transition performance

---

## Content Requirements

### Artwork Assets Needed
For each of the 6 artworks:
1. **Thumbnail image** (for feed post, locked state)
2. **Full artwork** (images, video files, PDFs, interactive elements)
3. **Artist statement** (text)
4. **Title** and **year**
5. **Medium/format** description

### Mechanism Content
Each mechanism needs its specific content layer:

1. **Confirmshaming** (Lynch): Corporate press releases, testimonials (text)
2. **Autoplay** (Weigel): Police press conference video, incident report, news coverage
3. **Time-Out** (Gibbins): Wellness messaging, screen time guidelines (text)
4. **Infinite Scroll** (desire_engineering): 500+ procedurally generated testimonials (templates)
5. **Surveillance** (Perfect Users): Privacy policy, data benefits text
6. **Harmony Button** (Search Engine Scores): Terms of Service, Community Guidelines (text)

### About/Context Content
- Full exhibition statement
- Artist bios (short)
- Curatorial statement
- Technical explanation
- Credits

---

## Accessibility Considerations

### Challenges
This exhibition intentionally uses manipulative UX patterns, which creates tension with accessibility principles. Some mechanisms may be difficult for:
- Screen reader users
- Users with motor impairments
- Users with cognitive disabilities
- Users with limited time

### Mitigation Strategies
1. **Context/Help page** clearly explains what to expect
2. **Skip mechanism** option? (after attempting for X minutes)
3. **Keyboard navigation** for all mechanisms
4. **High contrast mode** option
5. **Screen reader descriptions** explaining visual mechanisms
6. Consider **"exhibition mode"** that reveals all artworks without mechanisms (for accessibility/research purposes)

### Ethical Question
Is it acceptable to create an exhibition about manipulative design that is itself temporarily manipulative? The experience is opt-in, time-limited, and educational. Consider adding prominent disclaimer on landing page.

---

## Technical Debt & Future Enhancements

### Known Limitations (Prototype)
- No real backend (all state in localStorage)
- No user analytics
- Limited mobile optimization
- Procedural content may be repetitive
- No CMS for easy content updates

### Future Enhancements (Post-Launch)
- Backend for tracking anonymous solve patterns
- Real-time global stats ("X people currently trapped in infinite scroll")
- More mechanisms (rotating collection?)
- Artist-submitted mechanisms
- Downloadable "field guide" to attention capture
- Workshop mode (for teaching about dark patterns)

---

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "zustand": "^4.4.7",
    "framer-motion": "^10.16.16"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.2"
  }
}
```

---

## Environment Setup

```bash
# Create project
npm create vite@latest exhibition-site -- --template react
cd exhibition-site

# Install dependencies
npm install zustand framer-motion react-router-dom

# Project structure
mkdir -p src/{components/{Feed,Mechanisms,Artworks,Infrastructure,Layout,EndingState},data,store,hooks,utils,styles}
mkdir -p public/artworks/{lynch,weigel,gibbins,desire-engineering,perfect-users,search-engine-scores}

# Start dev server
npm run dev
```

---

## Notes for Claude Code

### Development Philosophy
- **Iterate quickly**: Get mechanisms working in simplest form first
- **Visual polish later**: Focus on functionality before aesthetics
- **Component isolation**: Each mechanism is independent component
- **Progressive enhancement**: Basic experience works, then add surveillance layers
- **Performance matters**: Mouse tracking and infinite scroll need optimization

### Code Style Preferences
- Functional components with hooks (no class components)
- CSS Modules for styling (scoped, no conflicts)
- Comments for complex puzzle logic
- Descriptive variable names (readability over brevity)
- Extract magic numbers to constants

### Testing Strategy
- Test each mechanism in isolation first
- Test state persistence (refresh browser)
- Test ending state transition
- Test with localStorage cleared
- Test "back" button behavior

### Git Workflow (If Applicable)
- Main branch = stable prototype
- Feature branches for each mechanism
- Commit after each mechanism works
- Tag releases (v0.1-mechanism-1, v0.2-mechanism-2, etc.)

---

## Questions for User Before Starting Development

1. **Hosting**: Where will this be deployed? (Netlify, Vercel, custom server?)
2. **Domain**: What URL will this live at?
3. **Analytics**: Do you want any tracking of user behavior (anonymized)?
4. **Mobile**: Should this work on mobile, or intentionally desktop-only?
5. **Time commitment**: How long do you expect visitors to spend? (15 min? 30 min? 1 hour?)
6. **Skip option**: Should there be a way to bypass mechanisms if stuck?
7. **Reset**: Should reset be obvious or hidden?
8. **Content**: Do you have all artwork assets ready, or placeholder for now?
9. **Video hosting**: For Gibbins video, where hosted? (YouTube? Vimeo? Self-hosted?)
10. **Search Engine Scores**: Should visitors actually perform searches, or just receive instructions?

---

## Success Criteria

The prototype is successful when:

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

---

## Contact & Collaboration

**Primary Developer**: Claude (AI Assistant)
**Client/Curator**: J
**Timeline**: 7 weeks to functional prototype
**Communication**: Iterative development with frequent check-ins

---

*This document is a living specification. Update as development progresses and requirements evolve.*
