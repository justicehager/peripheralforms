import { useState, useEffect, useRef, useCallback } from 'react'
import { useStore } from '../../store/useStore'
import styles from './SurveillanceUI.module.css'

// Target pattern: click zones in specific order
const TARGET_ZONES = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'center']

export default function SurveillanceUI({ onSolve }) {
  const { solveMechanism, trackSurveillance } = useStore()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [clickPattern, setClickPattern] = useState([])
  const [hoverZone, setHoverZone] = useState(null)
  const [hoverDuration, setHoverDuration] = useState(0)
  const [isSolved, setIsSolved] = useState(false)
  const [trackingData, setTrackingData] = useState({
    totalMoves: 0,
    totalClicks: 0,
    timeTracked: 0
  })
  const containerRef = useRef(null)
  const hoverStartRef = useRef(null)
  const trackingIntervalRef = useRef(null)
  const throttleTimeoutRef = useRef(null)

  // Track time and cleanup
  useEffect(() => {
    trackingIntervalRef.current = setInterval(() => {
      setTrackingData(prev => ({
        ...prev,
        timeTracked: prev.timeTracked + 1
      }))
    }, 1000)

    return () => {
      if (trackingIntervalRef.current) {
        clearInterval(trackingIntervalRef.current)
      }
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current)
      }
    }
  }, [])

  // Handle mouse movement with throttling
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return

    // Throttle to 50ms (20 updates per second instead of 100+)
    if (throttleTimeoutRef.current) return

    throttleTimeoutRef.current = setTimeout(() => {
      throttleTimeoutRef.current = null
    }, 50)

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePos({ x: Math.round(x), y: Math.round(y) })
    setTrackingData(prev => ({
      ...prev,
      totalMoves: prev.totalMoves + 1
    }))

    // Only update store every 10th move to reduce overhead
    if (Math.random() < 0.1) {
      trackSurveillance({
        mouseMovements: [{ x, y, timestamp: Date.now() }]
      })
    }

    // Determine which zone the mouse is in
    const zone = getZone(x, y, rect.width, rect.height)
    if (zone !== hoverZone) {
      setHoverZone(zone)
      hoverStartRef.current = Date.now()
      setHoverDuration(0)
    }
  }, [hoverZone, trackSurveillance])

  // Track hover duration (reduced frequency for performance)
  useEffect(() => {
    if (hoverZone && hoverStartRef.current) {
      const interval = setInterval(() => {
        setHoverDuration(Date.now() - hoverStartRef.current)
      }, 250)
      return () => clearInterval(interval)
    }
  }, [hoverZone])

  const getZone = (x, y, width, height) => {
    const centerX = width / 2
    const centerY = height / 2
    const centerThreshold = 100

    // Center zone
    if (
      Math.abs(x - centerX) < centerThreshold &&
      Math.abs(y - centerY) < centerThreshold
    ) {
      return 'center'
    }

    // Quadrants
    if (x < centerX && y < centerY) return 'top-left'
    if (x >= centerX && y < centerY) return 'top-right'
    if (x < centerX && y >= centerY) return 'bottom-left'
    if (x >= centerX && y >= centerY) return 'bottom-right'

    return null
  }

  const handleZoneClick = (zone) => {
    const newPattern = [...clickPattern, zone]
    setClickPattern(newPattern)
    setTrackingData(prev => ({
      ...prev,
      totalClicks: prev.totalClicks + 1
    }))

    trackSurveillance({
      clickPatterns: newPattern
    })

    // Check if pattern matches
    if (newPattern.length === TARGET_ZONES.length) {
      const matches = newPattern.every((z, i) => z === TARGET_ZONES[i])
      if (matches) {
        setIsSolved(true)
        solveMechanism('surveillance')
        onSolve?.()
      } else {
        // Wrong pattern, reset
        setClickPattern([])
      }
    }
  }

  if (isSolved) {
    return (
      <div className={styles['surveillance-solved']}>
        <h3>🔓 Mechanism Solved</h3>
        <p>You performed the pattern under total surveillance.</p>
        <p className={styles['data-summary']}>
          Tracked: {trackingData.totalMoves} mouse movements, {trackingData.totalClicks} clicks,{' '}
          {trackingData.timeTracked}s of observation
        </p>
      </div>
    )
  }

  return (
    <div className={styles['surveillance-container']}>
      <div className={styles['surveillance-header']}>
        <h3>🔒 PRIVACY & PERSONALIZATION</h3>
        <p className={styles['privacy-badge']}>PROTECTING YOUR EXPERIENCE</p>
      </div>

      <div className={styles['privacy-message']}>
        <h4>How We Use Your Data</h4>
        <p>
          We collect interaction data to personalize your experience and improve our services.
          This includes mouse movements, click patterns, and time spent on content.
        </p>
        <p>
          <strong>Your privacy is important to us.</strong> All data is used to enhance
          platform safety and deliver relevant content.
        </p>
      </div>

      <div className={styles['tracking-display']}>
        <h4>📊 Real-Time Activity Monitor</h4>
        <div className={styles['tracking-stats']}>
          <div className={styles.stat}>
            <span className={styles['stat-label']}>Mouse Position:</span>
            <span className={styles['stat-value']}>({mousePos.x}, {mousePos.y})</span>
          </div>
          <div className={styles.stat}>
            <span className={styles['stat-label']}>Current Zone:</span>
            <span className={styles['stat-value']}>{hoverZone || 'none'}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles['stat-label']}>Hover Duration:</span>
            <span className={styles['stat-value']}>{Math.round(hoverDuration)}ms</span>
          </div>
          <div className={styles.stat}>
            <span className={styles['stat-label']}>Total Movements:</span>
            <span className={styles['stat-value']}>{trackingData.totalMoves}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles['stat-label']}>Total Clicks:</span>
            <span className={styles['stat-value']}>{trackingData.totalClicks}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles['stat-label']}>Time Tracked:</span>
            <span className={styles['stat-value']}>{trackingData.timeTracked}s</span>
          </div>
        </div>
      </div>

      <div className={styles['interaction-zone']} ref={containerRef} onMouseMove={handleMouseMove}>
        <div className={styles['zone-grid']}>
          <div
            className={`${styles.zone} ${styles['top-left']} ${hoverZone === 'top-left' ? styles.active : ''} ${
              clickPattern.includes('top-left') ? styles.clicked : ''
            }`}
            onClick={() => handleZoneClick('top-left')}
          >
            <span className={styles['zone-label']}>1</span>
          </div>
          <div
            className={`${styles.zone} ${styles['top-right']} ${hoverZone === 'top-right' ? styles.active : ''} ${
              clickPattern.includes('top-right') ? styles.clicked : ''
            }`}
            onClick={() => handleZoneClick('top-right')}
          >
            <span className={styles['zone-label']}>2</span>
          </div>
          <div
            className={`${styles.zone} ${styles['bottom-left']} ${hoverZone === 'bottom-left' ? styles.active : ''} ${
              clickPattern.includes('bottom-left') ? styles.clicked : ''
            }`}
            onClick={() => handleZoneClick('bottom-left')}
          >
            <span className={styles['zone-label']}>3</span>
          </div>
          <div
            className={`${styles.zone} ${styles['bottom-right']} ${hoverZone === 'bottom-right' ? styles.active : ''} ${
              clickPattern.includes('bottom-right') ? styles.clicked : ''
            }`}
            onClick={() => handleZoneClick('bottom-right')}
          >
            <span className={styles['zone-label']}>4</span>
          </div>
          <div
            className={`${styles.zone} ${styles.center} ${hoverZone === 'center' ? styles.active : ''} ${
              clickPattern.includes('center') ? styles.clicked : ''
            }`}
            onClick={() => handleZoneClick('center')}
          >
            <span className={styles['zone-label']}>5</span>
          </div>
        </div>

        <div className={styles['pattern-tracker']}>
          <p>Click Pattern: {clickPattern.length > 0 ? clickPattern.join(' → ') : 'none'}</p>
          <p className={styles['pattern-progress']}>
            {clickPattern.length} / {TARGET_ZONES.length} steps
          </p>
        </div>
      </div>
    </div>
  )
}
