import { useState, useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'

// Hook to track mouse movements and clicks
export function useMouseTracking() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [clickPatterns, setClickPatterns] = useState([])
  const [hoveredElement, setHoveredElement] = useState(null)
  const mouseMovementsRef = useRef([])
  const { trackSurveillance } = useStore()

  useEffect(() => {
    // Track mouse movements
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      setMousePosition({ x: clientX, y: clientY })

      // Store movement data with timestamp
      mouseMovementsRef.current.push({
        x: clientX,
        y: clientY,
        timestamp: Date.now()
      })

      // Keep only recent movements (last 50)
      if (mouseMovementsRef.current.length > 50) {
        mouseMovementsRef.current.shift()
      }
    }

    // Track clicks
    const handleClick = (e) => {
      const rect = e.target.getBoundingClientRect()
      const relativeX = e.clientX - rect.left
      const relativeY = e.clientY - rect.top
      const elementId = e.target.id || e.target.className || 'unknown'

      const newPattern = {
        elementId,
        x: relativeX,
        y: relativeY,
        timestamp: Date.now()
      }

      setClickPatterns(prev => {
        const updated = [...prev, newPattern].slice(-20)
        trackSurveillance({ clickPatterns: updated })
        return updated
      })
    }

    // Track hover
    const handleMouseOver = (e) => {
      setHoveredElement({
        id: e.target.id || e.target.className || 'unknown',
        tag: e.target.tagName
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('click', handleClick)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', handleClick)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [trackSurveillance])

  return {
    mousePosition,
    clickPatterns,
    hoveredElement,
    mouseMovements: mouseMovementsRef.current
  }
}
