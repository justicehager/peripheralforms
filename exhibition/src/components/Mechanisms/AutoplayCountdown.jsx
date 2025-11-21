import { useState, useEffect, useRef, useCallback } from 'react'
import { useStore } from '../../store/useStore'
import styles from './AutoplayCountdown.module.css'

// Video specifications
const YOUTUBE_VIDEO_ID = 'j2Adh7SVw3Q' // Jennifer Weigel's video
const CLUE_TIMESTAMP = 127.3 // Hidden clue appears here (in seconds)
const PAUSE_WINDOW = 2.0 // Acceptable margin for pausing (in seconds)

// Generate a unique ID for this instance
let instanceCounter = 0

export default function AutoplayCountdown({ onSolve }) {
  const { solveMechanism } = useStore()
  const [isSolved, setIsSolved] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [showClue, setShowClue] = useState(false)
  const playerRef = useRef(null)
  const isMountedRef = useRef(true)
  const containerRef = useRef(null)
  const playerIdRef = useRef(`yt-player-${++instanceCounter}`)

  // Callback ref that initializes the YouTube player when element is mounted
  const setPlayerElement = useCallback((element) => {
    if (!element || playerRef.current) return

    containerRef.current = element

    const initializePlayer = () => {
      if (!isMountedRef.current || !containerRef.current || playerRef.current) {
        return
      }

      // Verify element is in the document
      if (!document.body.contains(containerRef.current)) {
        return
      }

      try {
        // Create a div for YouTube to replace
        const playerDiv = document.createElement('div')
        playerDiv.id = playerIdRef.current
        containerRef.current.appendChild(playerDiv)

        // Initialize YouTube player on the created div
        playerRef.current = new window.YT.Player(playerDiv, {
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
      } catch (error) {
        console.error('Error initializing YouTube player:', error)
      }
    }

    // Wait for YouTube API to be ready
    if (window.YT && window.YT.Player) {
      // API is loaded, wait a bit for React to finish rendering
      setTimeout(initializePlayer, 100)
    } else {
      // Load the API first
      if (!window.YT) {
        const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]')
        if (!existingScript) {
          const tag = document.createElement('script')
          tag.src = 'https://www.youtube.com/iframe_api'
          tag.async = true
          document.head.appendChild(tag)
        }
      }

      const originalCallback = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        if (originalCallback) originalCallback()
        setTimeout(initializePlayer, 100)
      }
    }
  }, [])

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false

      // Destroy player if it exists
      if (playerRef.current) {
        try {
          if (typeof playerRef.current.destroy === 'function') {
            playerRef.current.destroy()
          }
        } catch (error) {
          // Ignore errors during cleanup
        }
        playerRef.current = null
      }
    }
  }, [])

  // Track current time and show clue
  useEffect(() => {
    const interval = setInterval(() => {
      // Only update state if component is still mounted
      if (!isMountedRef.current) {
        return
      }

      if (playerRef.current && playerRef.current.getCurrentTime) {
        try {
          const time = playerRef.current.getCurrentTime()
          setCurrentTime(time)

          // Show clue briefly at target timestamp
          if (Math.abs(time - CLUE_TIMESTAMP) < 0.5) {
            setShowClue(true)
          } else {
            setShowClue(false)
          }
        } catch (error) {
          // Player might not be ready yet, ignore
        }
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const onPlayerReady = (event) => {
    // Auto-play is handled by playerVars
  }

  const onPlayerStateChange = (event) => {
    // Only process if component is still mounted
    if (!isMountedRef.current) {
      return
    }

    // YT.PlayerState.PAUSED === 2
    if (event.data === 2 && playerRef.current) {
      try {
        const pauseTime = playerRef.current.getCurrentTime()

        // Check if paused at correct timestamp
        if (Math.abs(pauseTime - CLUE_TIMESTAMP) < PAUSE_WINDOW) {
          setIsSolved(true)
          solveMechanism('autoplay')
          onSolve?.()
        }
      } catch (error) {
        console.error('Error checking pause time:', error)
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
            <div ref={setPlayerElement} className={styles['youtube-player']}></div>
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
