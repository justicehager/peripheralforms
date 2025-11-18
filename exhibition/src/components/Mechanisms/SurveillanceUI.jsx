import { useState, useEffect, useRef } from 'react'
import { useStore } from '../../store/useStore'
import './SurveillanceUI.module.css'

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

  // Track time
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
    }
  }, [])

  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePos({ x: Math.round(x), y: Math.round(y) })
    setTrackingData(prev => ({
      ...prev,
      totalMoves: prev.totalMoves + 1
    }))

    trackSurveillance({
      mouseMovements: [{ x, y, timestamp: Date.now() }]
    })

    // Determine which zone the mouse is in
    const zone = getZone(x, y, rect.width, rect.height)
    if (zone !== hoverZone) {
      setHoverZone(zone)
      hoverStartRef.current = Date.now()
      setHoverDuration(0)
    }
  }

  // Track hover duration
  useEffect(() => {
    if (hoverZone && hoverStartRef.current) {
      const interval = setInterval(() => {
        setHoverDuration(Date.now() - hoverStartRef.current)
      }, 100)
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
      <div className="surveillance-solved">
        <h3>🔓 Mechanism Solved</h3>
        <p>You performed the pattern under total surveillance.</p>
        <p className="data-summary">
          Tracked: {trackingData.totalMoves} mouse movements, {trackingData.totalClicks} clicks,{' '}
          {trackingData.timeTracked}s of observation
        </p>
      </div>
    )
  }

  return (
    <div className="surveillance-container">
      <div className="surveillance-header">
        <h3>🔒 PRIVACY & PERSONALIZATION</h3>
        <p className="privacy-badge">PROTECTING YOUR EXPERIENCE</p>
      </div>

      <div className="privacy-message">
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

      <div className="tracking-display">
        <h4>📊 Real-Time Activity Monitor</h4>
        <div className="tracking-stats">
          <div className="stat">
            <span className="stat-label">Mouse Position:</span>
            <span className="stat-value">({mousePos.x}, {mousePos.y})</span>
          </div>
          <div className="stat">
            <span className="stat-label">Current Zone:</span>
            <span className="stat-value">{hoverZone || 'none'}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Hover Duration:</span>
            <span className="stat-value">{Math.round(hoverDuration)}ms</span>
          </div>
          <div className="stat">
            <span className="stat-label">Total Movements:</span>
            <span className="stat-value">{trackingData.totalMoves}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Total Clicks:</span>
            <span className="stat-value">{trackingData.totalClicks}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Time Tracked:</span>
            <span className="stat-value">{trackingData.timeTracked}s</span>
          </div>
        </div>
      </div>

      <div className="interaction-zone" ref={containerRef} onMouseMove={handleMouseMove}>
        <div className="zone-grid">
          <div
            className={`zone top-left ${hoverZone === 'top-left' ? 'active' : ''} ${
              clickPattern.includes('top-left') ? 'clicked' : ''
            }`}
            onClick={() => handleZoneClick('top-left')}
          >
            <span className="zone-label">1</span>
          </div>
          <div
            className={`zone top-right ${hoverZone === 'top-right' ? 'active' : ''} ${
              clickPattern.includes('top-right') ? 'clicked' : ''
            }`}
            onClick={() => handleZoneClick('top-right')}
          >
            <span className="zone-label">2</span>
          </div>
          <div
            className={`zone bottom-left ${hoverZone === 'bottom-left' ? 'active' : ''} ${
              clickPattern.includes('bottom-left') ? 'clicked' : ''
            }`}
            onClick={() => handleZoneClick('bottom-left')}
          >
            <span className="zone-label">3</span>
          </div>
          <div
            className={`zone bottom-right ${hoverZone === 'bottom-right' ? 'active' : ''} ${
              clickPattern.includes('bottom-right') ? 'clicked' : ''
            }`}
            onClick={() => handleZoneClick('bottom-right')}
          >
            <span className="zone-label">4</span>
          </div>
          <div
            className={`zone center ${hoverZone === 'center' ? 'active' : ''} ${
              clickPattern.includes('center') ? 'clicked' : ''
            }`}
            onClick={() => handleZoneClick('center')}
          >
            <span className="zone-label">5</span>
          </div>
        </div>

        <div className="pattern-tracker">
          <p>Click Pattern: {clickPattern.length > 0 ? clickPattern.join(' → ') : 'none'}</p>
          <p className="pattern-progress">
            {clickPattern.length} / {TARGET_ZONES.length} steps
          </p>
        </div>
      </div>

      <div className="surveillance-hint">
        <p className="hint-text">
          💡 Maximum surveillance requires maximum compliance
        </p>
        <p className="hint-subtext">
          Hint: Click the zones in numerical order (1 → 2 → 3 → 4 → 5)
        </p>
      </div>
    </div>
  )
}
