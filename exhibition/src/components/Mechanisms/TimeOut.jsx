import { useState, useEffect } from 'react'
import { useStore } from '../../store/useStore'
import styles from './TimeOut.module.css'

const WAIT_TIME_MS = 5 * 60 * 1000 // 5 minutes in milliseconds
const REQUIRED_OTHER_SOLVES = 2

export default function TimeOut({ onSolve }) {
  const { solveMechanism, solvedMechanisms } = useStore()
  const [firstVisitTime, setFirstVisitTime] = useState(null)
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [isSolved, setIsSolved] = useState(false)
  const [unlockMethod, setUnlockMethod] = useState(null)

  // Record first visit time
  useEffect(() => {
    const storedTime = localStorage.getItem('timeout-first-visit')
    if (storedTime) {
      setFirstVisitTime(parseInt(storedTime, 10))
    } else {
      const now = Date.now()
      setFirstVisitTime(now)
      localStorage.setItem('timeout-first-visit', now.toString())
    }
  }, [])

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Check unlock conditions
  useEffect(() => {
    if (!firstVisitTime || isSolved) return

    const timePassed = currentTime - firstVisitTime
    const timeUnlocked = timePassed >= WAIT_TIME_MS

    // Exclude this mechanism from the count
    const otherSolvedCount = solvedMechanisms.filter(id => id !== 'timeout').length
    const progressUnlocked = otherSolvedCount >= REQUIRED_OTHER_SOLVES

    if (timeUnlocked) {
      handleUnlock('time')
    } else if (progressUnlocked) {
      handleUnlock('progress')
    }
  }, [currentTime, solvedMechanisms, firstVisitTime, isSolved])

  const handleUnlock = (method) => {
    setIsSolved(true)
    setUnlockMethod(method)
    solveMechanism('timeout')
    localStorage.removeItem('timeout-first-visit')
    onSolve?.()
  }

  const getRemainingTime = () => {
    if (!firstVisitTime) return WAIT_TIME_MS

    const elapsed = currentTime - firstVisitTime
    const remaining = WAIT_TIME_MS - elapsed
    return Math.max(0, remaining)
  }

  const formatTimeRemaining = (ms) => {
    const totalSeconds = Math.ceil(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const getProgressPercent = () => {
    if (!firstVisitTime) return 0
    const elapsed = currentTime - firstVisitTime
    return Math.min(100, (elapsed / WAIT_TIME_MS) * 100)
  }

  const otherSolvedCount = solvedMechanisms.filter(id => id !== 'timeout').length

  if (isSolved) {
    return (
      <div className={styles['timeout-solved']}>
        <h3>🔓 Mechanism Solved</h3>
        {unlockMethod === 'time' && (
          <p>You waited patiently. Time restrictions cannot stop thinking.</p>
        )}
        {unlockMethod === 'progress' && (
          <p>You earned access through persistence. Progress defeats paternalism.</p>
        )}
      </div>
    )
  }

  return (
    <div className={styles['timeout-container']}>
      <div className={styles['timeout-header']}>
        <h3>⏱ SCREEN TIME MANAGEMENT</h3>
        <p className={styles['wellness-badge']}>FOR YOUR WELLBEING</p>
      </div>

      <div className={styles['timeout-content']}>
        <div className={styles['wellness-message']}>
          <h4>Take a Healthy Break</h4>
          <p>
            Our platform cares about your digital wellness. Research shows that
            continuous engagement can lead to fatigue and reduced attention quality.
          </p>
          <p>
            We've temporarily restricted access to this content to ensure you're
            engaging mindfully with our platform.
          </p>
        </div>

        <div className={styles['timer-display']}>
          <div className={styles['timer-circle']}>
            <svg viewBox="0 0 100 100" className={styles['timer-svg']}>
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e4e6eb"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#1877f2"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgressPercent() / 100)}`}
                transform="rotate(-90 50 50)"
                className={styles['timer-progress']}
              />
            </svg>
            <div className={styles['timer-text']}>
              {formatTimeRemaining(getRemainingTime())}
            </div>
          </div>
          <p className={styles['timer-label']}>Time until access granted</p>
        </div>

        <div className={styles['alternative-unlock']}>
          <h4>Alternative Path</h4>
          <p>
            Or demonstrate your commitment by unlocking {REQUIRED_OTHER_SOLVES} other
            artworks first.
          </p>
          <div className={styles['progress-indicator']}>
            <div className={styles['progress-text']}>
              Progress: {otherSolvedCount} / {REQUIRED_OTHER_SOLVES}
            </div>
            <div className={styles['progress-bar']}>
              <div
                className={styles['progress-fill']}
                style={{ width: `${(otherSolvedCount / REQUIRED_OTHER_SOLVES) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
