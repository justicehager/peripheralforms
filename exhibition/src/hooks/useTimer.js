import { useState, useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'

// Hook for time-based mechanisms
export function useTimer(duration = 5 * 60 * 1000) { // 5 minutes default
  const [timeRemaining, setTimeRemaining] = useState(duration)
  const [isExpired, setIsExpired] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const startTimeRef = useRef(Date.now())
  const { trackSurveillance } = useStore()

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const remaining = Math.max(0, duration - elapsed)

      setTimeRemaining(remaining)
      trackSurveillance({ timeOnSite: elapsed })

      if (remaining <= 0) {
        setIsExpired(true)
        setIsActive(false)
      }
    }, 100) // Update every 100ms for smooth countdown

    return () => clearInterval(interval)
  }, [isActive, duration, trackSurveillance])

  const formatTime = (ms) => {
    const totalSeconds = Math.ceil(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return {
    timeRemaining,
    isExpired,
    isActive,
    formattedTime: formatTime(timeRemaining),
    pause: () => setIsActive(false),
    resume: () => setIsActive(true),
    reset: () => {
      startTimeRef.current = Date.now()
      setTimeRemaining(duration)
      setIsExpired(false)
      setIsActive(true)
    }
  }
}
