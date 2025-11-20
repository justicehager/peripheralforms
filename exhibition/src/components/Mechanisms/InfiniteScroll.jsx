import { useState, useEffect, useRef } from 'react'
import { useStore } from '../../store/useStore'
import styles from './InfiniteScroll.module.css'

// Configuration
const TOTAL_ITEMS = 250
const EXIT_PATTERN_INDEX = 187 // Where the pattern/exit appears
const ITEMS_PER_BATCH = 20

// Templates for procedural generation
const ROLES = [
  'Chief Innovation Officer', 'VP of Digital Transformation', 'Head of Engagement',
  'Director of Growth', 'Senior Strategy Lead', 'Principal Evangelist',
  'Customer Success Champion', 'Community Manager', 'Brand Ambassador'
]

const COMPANIES = [
  'TechForward', 'InnovateCorp', 'FutureScale', 'GrowthDynamics', 'AgileMinds',
  'CloudVentures', 'DataDriven Inc', 'NextGen Solutions', 'SynergyLabs'
]

const TEMPLATES = [
  "🚀 JUST HIT {metric} USERS!!! This is INSANE!! {buzzword} is LITERALLY THE FUTURE!! 🔥🔥",
  "OMG just finished the MOST INCREDIBLE keynote on {topic}!! The energy was UNREAL!! {buzzword} is EVERYTHING!! 💯",
  "SO GRATEFUL to be named {award}!! THANK YOU to everyone who believed!! {buzzword} CHANGED MY LIFE!! 🙏✨",
  "EXCITING NEWS!! We're {action} and I'm LITERALLY SHAKING!! This is what {buzzword} looks like!! 🎉🎉",
  "WOW. Just WOW. From {past} to {present}!! The journey has been CRAZY!! Key lesson: {buzzword} is NON-NEGOTIABLE!! 💪",
  "MIND. BLOWN. 🤯 Just had the BEST conversation with {connection} about {topic}!! {buzzword} is the ONLY WAY!! 🚀"
]

const BUZZWORDS = [
  'human-centered design', 'agile methodology', 'growth mindset', 'digital disruption',
  'authentic engagement', 'data-driven decisions', 'scalable impact', 'synergistic collaboration'
]

const generateTestimonial = (index) => {
  const seed = index * 7919 // Prime number for pseudo-randomness

  const template = TEMPLATES[seed % TEMPLATES.length]
  const role = ROLES[(seed * 3) % ROLES.length]
  const company = COMPANIES[(seed * 5) % COMPANIES.length]
  const buzzword = BUZZWORDS[(seed * 11) % BUZZWORDS.length]

  const content = template
    .replace('{metric}', `${(seed % 900) + 100}K`)
    .replace('{buzzword}', buzzword)
    .replace('{topic}', 'the future of digital engagement')
    .replace('{award}', 'Top Voice in Innovation')
    .replace('{action}', 'scaling to new markets')
    .replace('{past}', 'junior analyst')
    .replace('{present}', role.toLowerCase())
    .replace('{connection}', 'industry leaders')

  return {
    id: index,
    name: `Professional ${index}`,
    role,
    company,
    content,
    avatar: `avatar-${seed % 20}`,
    likes: (seed * 13) % 500,
    comments: (seed * 7) % 100
  }
}

export default function InfiniteScroll({ onSolve }) {
  const { solveMechanism } = useStore()
  const [items, setItems] = useState([])
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH)
  const [scrollDepth, setScrollDepth] = useState(0)
  const [isSolved, setIsSolved] = useState(false)
  const [showExit, setShowExit] = useState(false)
  const scrollContainerRef = useRef(null)
  const observerRef = useRef(null)

  // Generate initial items
  useEffect(() => {
    const initialItems = Array.from({ length: TOTAL_ITEMS }, (_, i) =>
      generateTestimonial(i)
    )
    setItems(initialItems)
  }, [])

  // Handle scroll depth tracking
  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
    const depth = scrollTop + clientHeight
    const totalHeight = scrollHeight
    const scrollPercent = (depth / totalHeight) * 100

    setScrollDepth(scrollPercent)

    // Load more items as user scrolls
    if (scrollPercent > 80 && visibleCount < TOTAL_ITEMS) {
      setVisibleCount(prev => Math.min(prev + ITEMS_PER_BATCH, TOTAL_ITEMS))
    }

    // Show exit when reaching pattern index
    if (visibleCount >= EXIT_PATTERN_INDEX && !showExit) {
      setShowExit(true)
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [visibleCount, showExit])

  const handleExitClick = () => {
    setIsSolved(true)
    solveMechanism('infinite_scroll')
    onSolve?.()
  }

  if (isSolved) {
    return (
      <div className={styles['infinitescroll-solved']}>
        <h3>🔓 Mechanism Solved</h3>
        <p>You escaped the endless performance. Pattern recognition defeats compulsory scrolling.</p>
        <p className={styles['pattern-revealed']}>
          The exit appeared at item {EXIT_PATTERN_INDEX} of {TOTAL_ITEMS}
        </p>
      </div>
    )
  }

  return (
    <div className={styles['infinitescroll-container']}>
      <div className={styles['infinitescroll-header']}>
        <h3>🔥 For You</h3>
        <p className={styles['trending-badge']}>TRENDING NOW</p>
      </div>

      <div className={styles['scroll-stats']}>
        <span className={styles['stat-item']}>🔥 {visibleCount} posts loaded</span>
        <span className={styles['stat-item']}>👀 Keep scrolling</span>
      </div>

      <div
        className={styles['testimonials-scroll']}
        ref={scrollContainerRef}
      >
        {items.slice(0, visibleCount).map((item, index) => (
          <div key={item.id} className={styles['testimonial-card']}>
            <div className={styles['testimonial-header']}>
              <div className={`${styles.avatar} ${styles[item.avatar]}`} />
              <div className={styles['testimonial-info']}>
                <h4>{item.name}</h4>
                <p className={styles.role}>{item.role} at {item.company}</p>
              </div>
            </div>
            <div className={styles['testimonial-content']}>
              <p>{item.content}</p>
            </div>
            <div className={styles['testimonial-footer']}>
              <span>👍 {item.likes}</span>
              <span>💬 {item.comments}</span>
              <span>🔄 Share</span>
            </div>

            {/* Pattern/Exit appears at specific index */}
            {index === EXIT_PATTERN_INDEX - 1 && showExit && (
              <div className={styles['pattern-break']}>
                <div className={styles['pattern-notice']}>
                  <div className={styles['glitch-text']}>⚠️ PATTERN DETECTED ⚠️</div>
                  <p className={styles['pattern-message']}>
                    They're all saying the same thing.<br />
                    The excitement is manufactured.<br />
                    The performance is compulsory.<br />
                    The scroll never ends.
                  </p>
                  <button
                    className={styles['exit-button']}
                    onClick={handleExitClick}
                  >
                    🚪 ESCAPE THE FEED
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {visibleCount < TOTAL_ITEMS && (
          <div className={styles['loading-more']}>
            <div className={styles.spinner} />
            <p>Loading more success stories...</p>
          </div>
        )}
      </div>
    </div>
  )
}
