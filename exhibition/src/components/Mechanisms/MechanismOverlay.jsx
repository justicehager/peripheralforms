import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { getMechanismTheme } from '../../data/mechanismThemes'
import Confirmshaming from './Confirmshaming'
import AutoplayCountdown from './AutoplayCountdown'
import TimeOut from './TimeOut'
import InfiniteScroll from './InfiniteScroll'
import SurveillanceUI from './SurveillanceUI'
import HarmonyButton from './HarmonyButton'
import styles from './MechanismOverlay.module.css'

const MECHANISM_COMPONENTS = {
  'Confirmshaming': Confirmshaming,
  'Autoplay/Countdown': AutoplayCountdown,
  'Time-Out': TimeOut,
  'Infinite Scroll': InfiniteScroll,
  'Surveillance UI': SurveillanceUI,
  'Harmony Button': HarmonyButton
}

export default function MechanismOverlay({ artwork, onClose }) {
  const navigate = useNavigate()
  const { solvedMechanisms } = useStore()
  const MechanismComponent = MECHANISM_COMPONENTS[artwork.mechanismType]
  const isUnlocked = solvedMechanisms.includes(artwork.mechanismId)
  const theme = getMechanismTheme(artwork.mechanismId)

  // Redirect to artwork page if mechanism gets solved
  if (isUnlocked) {
    setTimeout(() => {
      onClose()
      navigate(`/artwork/${artwork.id}`)
    }, 500)
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.content} ${theme.className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className={styles.header}>
          <div className={styles.thumbnail}>{artwork.thumbnail}</div>
          <div className={styles.info}>
            <h2>{artwork.title}</h2>
            <p className={styles.artist}>{artwork.artistName}</p>
            <p className={styles.description}>{artwork.description}</p>
          </div>
        </div>

        <div className={styles.mechanismContainer}>
          {MechanismComponent ? (
            <MechanismComponent artworkId={artwork.id} mechanismId={artwork.mechanismId} />
          ) : (
            <div className={styles.error}>
              Mechanism not found: {artwork.mechanismType}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
