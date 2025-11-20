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

  // Record first visit time when mechanism opens
  useEffect(() => {
    const storedTime = localStorage.getItem('timeout-mechanism-opened')
    if (storedTime) {
      setFirstVisitTime(parseInt(storedTime, 10))
    } else {
      // Timer starts NOW when mechanism is opened
      const now = Date.now()
      setFirstVisitTime(now)
      localStorage.setItem('timeout-mechanism-opened', now.toString())
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
    localStorage.removeItem('timeout-mechanism-opened')
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
      <div className={styles['lockscreen-header']}>
        <div className={styles['medical-icon']}>🏥</div>
        <h3>ISOLATION PROTOCOL ACTIVE</h3>
        <p className={styles['facility-badge']}>INSTITUTIONAL QUARANTINE</p>
      </div>

      <div className={styles['lockscreen-content']}>
        <div className={styles['medical-notice']}>
          <div className={styles['warning-bar']}>⚠️ MANDATORY ISOLATION ⚠️</div>
          <h4>Patient Restriction Notice</h4>
          <p>
            For your safety and the safety of others, you have been placed under
            temporary content isolation. This is a standard medical procedure.
          </p>
          <p>
            Access to requested materials has been suspended pending completion
            of the mandatory observation period.
          </p>
          <div className={styles['institutional-seal']}>
            <span className={styles['seal-text']}>AUTHORIZED RESTRICTION</span>
          </div>
        </div>

        <div className={styles['timer-lockscreen']}>
          <div className={styles['clinical-display']}>
            <div className={styles['vital-monitor']}>
              <div className={styles['monitor-label']}>ISOLATION TIME REMAINING</div>
              <div className={styles['digital-timer']}>
                {formatTimeRemaining(getRemainingTime())}
              </div>
              <div className={styles['progress-strip']}>
                <div
                  className={styles['progress-indicator']}
                  style={{ width: `${getProgressPercent()}%` }}
                />
              </div>
            </div>
          </div>
          <p className={styles['clinical-note']}>
            Restriction will be automatically lifted upon completion of observation period
          </p>
        </div>

        <div className={styles['override-notice']}>
          <div className={styles['medical-form']}>
            <h4>⚕️ ADMINISTRATIVE OVERRIDE</h4>
            <p>
              Medical staff may authorize early release with sufficient documentation.
              Complete {REQUIRED_OTHER_SOLVES} additional clearance procedures to request override.
            </p>
            <div className={styles['clearance-status']}>
              <div className={styles['status-label']}>
                CLEARANCES OBTAINED: {otherSolvedCount} / {REQUIRED_OTHER_SOLVES}
              </div>
              <div className={styles['clearance-bar']}>
                <div
                  className={styles['clearance-fill']}
                  style={{ width: `${(otherSolvedCount / REQUIRED_OTHER_SOLVES) * 100}%` }}
                />
              </div>
              {otherSolvedCount >= REQUIRED_OTHER_SOLVES && (
                <div className={styles['override-ready']}>
                  ✓ OVERRIDE AUTHORIZED - ACCESS GRANTED
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
