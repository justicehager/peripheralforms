import { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'

// Hook to track scroll depth as a percentage
export function useScrollDepth() {
  const [scrollDepth, setScrollDepth] = useState(0)
  const { trackSurveillance } = useStore()

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll depth as percentage of page height
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const depth = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0
      setScrollDepth(Math.round(depth))

      // Update surveillance data
      trackSurveillance({ scrollDepth: Math.round(depth) })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [trackSurveillance])

  return { scrollDepth }
}
