import { Link } from 'react-router-dom'
import Confirmshaming from '../Mechanisms/Confirmshaming'
import AutoplayCountdown from '../Mechanisms/AutoplayCountdown'
import TimeOut from '../Mechanisms/TimeOut'
import InfiniteScroll from '../Mechanisms/InfiniteScroll'
import SurveillanceUI from '../Mechanisms/SurveillanceUI'
import HarmonyButton from '../Mechanisms/HarmonyButton'
import styles from './FeedPost.module.css'

// Map mechanism types to components
const MECHANISM_COMPONENTS = {
  'Confirmshaming': Confirmshaming,
  'Autoplay/Countdown': AutoplayCountdown,
  'Time-Out': TimeOut,
  'Infinite Scroll': InfiniteScroll,
  'Surveillance UI': SurveillanceUI,
  'Harmony Button': HarmonyButton
}

export default function FeedPost({ artwork, isUnlocked }) {
  const MechanismComponent = MECHANISM_COMPONENTS[artwork.mechanismType]

  // Comprehensive debug logging
  console.log('FeedPost Debug:', {
    artworkId: artwork.id,
    mechanismType: artwork.mechanismType,
    isUnlocked,
    hasComponent: !!MechanismComponent,
    componentName: MechanismComponent?.name
  })

  return (
    <article className={styles['feed-post']}>
      <div className={styles['post-header']}>
        <div className={styles['avatar-placeholder']} />
        <div className={styles['header-info']}>
          <h3>{artwork.artistName}</h3>
          <p className={styles['verified']}>✓ Verified Artist</p>
        </div>
      </div>

      <div className={styles['post-content']}>
        {isUnlocked ? (
          <Link to={`/artwork/${artwork.id}`} className={styles['artwork-link']}>
            <div className={styles['artwork-placeholder']}>{artwork.title}</div>
            <div className={styles['unlocked-badge']}>🔓 Unlocked</div>
          </Link>
        ) : (
          <div className={styles['locked-content']}>
            {MechanismComponent ? (
              <MechanismComponent />
            ) : (
              <div className={styles['mechanism-placeholder']}>
                <div>Mechanism: {artwork.mechanismType}</div>
                <div style={{color: 'red', fontSize: '12px', marginTop: '10px'}}>
                  DEBUG: Component {MechanismComponent ? 'FOUND' : 'NOT FOUND'}
                  <br/>Available: {Object.keys(MECHANISM_COMPONENTS).join(', ')}
                </div>
              </div>
            )}
            <div className={styles['locked-badge']}>🔒 Locked</div>
          </div>
        )}
      </div>

      <div className={styles['post-footer']}>
        <div className={styles['engagement']}>
          <span>❤️ {artwork.likes}</span>
          <span>💬 {artwork.comments}</span>
          <span>🔄 {artwork.shares}</span>
        </div>
      </div>
    </article>
  )
}
