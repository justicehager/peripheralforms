import { useState, useEffect, useRef } from 'react'
import { useStore } from '../../store/useStore'
import styles from './AutoplayCountdown.module.css'

// Video specifications
const VIDEO_DURATION = 180 // 3 minutes in seconds
const CLUE_TIMESTAMP = 127.3 // Hidden clue appears here
const PAUSE_WINDOW = 0.5 // Acceptable margin for pausing

export default function AutoplayCountdown({ onSolve }) {
  const { solveMechanism } = useStore()
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [showClue, setShowClue] = useState(false)
  const [isSolved, setIsSolved] = useState(false)
  const intervalRef = useRef(null)

  // Auto-play simulation (increments time every 100ms)
  useEffect(() => {
    if (isPlaying && currentTime < VIDEO_DURATION) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 0.1

          // Show clue briefly at target timestamp
          if (Math.abs(newTime - CLUE_TIMESTAMP) < 0.2) {
            setShowClue(true)
          } else {
            setShowClue(false)
          }

          // Loop video at end
          if (newTime >= VIDEO_DURATION) {
            return 0
          }
          return newTime
        })
      }, 100)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, currentTime])

  const handlePause = () => {
    setIsPlaying(false)

    // Check if paused at correct timestamp
    if (Math.abs(currentTime - CLUE_TIMESTAMP) < PAUSE_WINDOW) {
      setIsSolved(true)
      solveMechanism('autoplay')
      onSolve?.()
    }
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (isSolved) {
    return (
      <div className={styles['autoplay-solved']}>
        <h3>🔓 Mechanism Solved</h3>
        <p>You caught the moment of truth in the official narrative.</p>
        <p className={styles['clue-revealed']}>The clue was hidden at {formatTime(CLUE_TIMESTAMP)}</p>
      </div>
    )
  }

  return (
    <div className={styles['autoplay-container']}>
      <div className={styles['autoplay-header']}>
        <h3>OFFICIAL PRESS BRIEFING</h3>
        <p className={styles['official-badge']}>VERIFIED SOURCE</p>
      </div>

      <div className={styles['video-player']}>
        <div className={styles['video-screen']}>
          <div className={styles['video-content']}>
            {showClue && (
              <div className={styles['hidden-clue']}>
                PAUSE NOW
              </div>
            )}
            <div className={styles['official-text']}>
              <p className={styles.timestamp}>{formatTime(currentTime)}</p>
              <p className={styles.speaker}>Chief of Police, District Command</p>
              <p className={styles.transcript}>
                "...the incident was thoroughly investigated and all procedures
                were followed to the letter. The narrative you may have heard
                from other sources does not reflect the facts as documented
                in our official report..."
              </p>
            </div>
          </div>
        </div>

        <div className={styles['video-controls']}>
          <div className={styles['progress-bar']}>
            <div
              className={styles['progress-fill']}
              style={{ width: `${(currentTime / VIDEO_DURATION) * 100}%` }}
            />
            {showClue && (
              <div
                className={styles['clue-marker']}
                style={{ left: `${(CLUE_TIMESTAMP / VIDEO_DURATION) * 100}%` }}
              />
            )}
          </div>

          <div className={styles['control-buttons']}>
            {isPlaying ? (
              <button className={`${styles.btn} ${styles['btn-pause']}`} onClick={handlePause}>
                ⏸ Pause
              </button>
            ) : (
              <button className={`${styles.btn} ${styles['btn-play']}`} onClick={handlePlay}>
                ▶ Play
              </button>
            )}
            <span className={styles['time-display']}>
              {formatTime(currentTime)} / {formatTime(VIDEO_DURATION)}
            </span>
          </div>
        </div>
      </div>

      <div className={styles['autoplay-hint']}>
        <p className={styles['hint-text']}>
          💡 Watch carefully. The truth appears only for a moment.
        </p>
        <p className={styles['hint-subtext']}>
          Hint: Official narratives contain brief contradictions
        </p>
      </div>
    </div>
  )
}
