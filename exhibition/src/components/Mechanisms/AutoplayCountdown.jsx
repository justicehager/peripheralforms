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
    // Load YouTube IFrame API only if not already loaded
    if (!window.YT) {
      // Check if script tag already exists
      const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]')

      if (!existingScript) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        tag.async = true
        document.head.appendChild(tag)
      }
    }

    // Function to initialize player
    const initializePlayer = () => {
      if (iframeRef.current && !playerRef.current) {
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
    }

    // Create YouTube player when API is ready
    if (window.YT && window.YT.Player) {
      // API already loaded
      initializePlayer()
    } else {
      // Wait for API to load
      window.onYouTubeIframeAPIReady = () => {
        initializePlayer()
      }
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy()
        playerRef.current = null
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
      <div className={styles['propaganda-overlay']}>
        <div className={styles['urgent-banner']}>
          ⚠️ MANDATORY VIEWING ⚠️
        </div>
      </div>

      <div className={styles['sticky-video-wrapper']}>
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
      </div>

      <div className={styles['propaganda-text']}>
        <p className={styles['compliance-message']}>
          YOU MUST WATCH TO COMPLETION
        </p>
        <p className={styles['warning-text']}>
          Scrolling will not stop this message
        </p>
        <p className={styles['filler-text']}>
          This is for your own safety. The information contained in this briefing is critical to your understanding of current events. Failure to comply with viewing requirements may result in restricted access. Your viewing is being monitored. Pay close attention. The truth is being presented to you. Accept what you see. Do not question the narrative. This message will follow you. You cannot escape. Compliance is mandatory.
        </p>
        <p className={styles['filler-text']}>
          We remind you that this is official information from verified sources. Any attempt to circumvent this viewing requirement will be logged. Your cooperation is appreciated. The platform values your attention. Continue watching. The content will unlock when compliance is confirmed. Trust the process. Accept the message. Stay focused.
        </p>
      </div>
    </div>
  )
}
