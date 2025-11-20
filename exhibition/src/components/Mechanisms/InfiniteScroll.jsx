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
  "Thrilled to announce our platform reached {metric} users! This milestone proves that {buzzword} is the future.",
  "Just wrapped an inspiring keynote on {topic}. The future of work is {buzzword}!",
  "Grateful to be recognized as a {award}. None of this would be possible without {buzzword}.",
  "Excited to share that we're {action}. This is what {buzzword} looks like in practice.",
  "Reflecting on my journey from {past} to {present}. Key lesson: embrace {buzzword}.",
  "Had an amazing conversation with {connection} about {topic}. Innovation requires {buzzword}!"
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
        <h3>SUCCESS STORIES</h3>
        <p className={styles['trending-badge']}>TRENDING IN YOUR NETWORK</p>
      </div>

      <div className={styles['scroll-progress']}>
        <div className={styles['progress-bar']}>
          <div
            className={styles['progress-fill']}
            style={{ width: `${scrollDepth}%` }}
          />
        </div>
        <p className={styles['progress-text']}>
          Viewing {visibleCount} of {TOTAL_ITEMS} testimonials
        </p>
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
                  ⚠️ PATTERN DETECTED ⚠️
                  <p>The testimonials repeat. The success is manufactured. The performance is compulsory.</p>
                  <button
                    className={styles['exit-button']}
                    onClick={handleExitClick}
                  >
                    EXIT THE SCROLL
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
