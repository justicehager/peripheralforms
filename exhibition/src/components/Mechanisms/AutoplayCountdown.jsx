import { useState, useEffect, useRef } from 'react'
import { useStore } from '../../store/useStore'
import styles from './AutoplayCountdown.module.css'

// Video specifications
const YOUTUBE_VIDEO_ID = 'j2Adh7SVw3Q' // Jennifer Weigel's video
const CLUE_TIMESTAMP = 127.3 // Hidden clue appears here (in seconds)
const PAUSE_WINDOW = 2.0 // Acceptable margin for pausing (in seconds)

export default function AutoplayCountdown({ onSolve }) {
  const { solveMechanism } = useStore()
  const [isSolved, setIsSolved] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [showClue, setShowClue] = useState(false)
  const playerRef = useRef(null)
  const iframeRef = useRef(null)

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    // Create YouTube player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(iframeRef.current, {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      })
    }

    // If API already loaded, initialize player
    if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player(iframeRef.current, {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      })
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy()
      }
    }
  }, [])

  // Track current time and show clue
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const time = playerRef.current.getCurrentTime()
        setCurrentTime(time)

        // Show clue briefly at target timestamp
        if (Math.abs(time - CLUE_TIMESTAMP) < 0.5) {
          setShowClue(true)
        } else {
          setShowClue(false)
        }
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const onPlayerReady = (event) => {
    // Auto-play is handled by playerVars
  }

  const onPlayerStateChange = (event) => {
    // YT.PlayerState.PAUSED === 2
    if (event.data === 2) {
      const pauseTime = playerRef.current.getCurrentTime()

      // Check if paused at correct timestamp
      if (Math.abs(pauseTime - CLUE_TIMESTAMP) < PAUSE_WINDOW) {
        setIsSolved(true)
        solveMechanism('autoplay')
        onSolve?.()
      }
    }
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
          {showClue && (
            <div className={styles['hidden-clue']}>
              PAUSE NOW
            </div>
          )}
          <div ref={iframeRef} className={styles['youtube-player']}></div>
        </div>
      </div>

      <div className={styles['autoplay-hint']}>
        <p className={styles['hint-text']}>
          💡 Watch carefully. The truth appears only for a moment.
        </p>
        <p className={styles['hint-subtext']}>
          Hint: Pause at {formatTime(CLUE_TIMESTAMP)} when you see the clue
        </p>
      </div>
    </div>
  )
}
