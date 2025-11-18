import { Link } from 'react-router-dom'
import Confirmshaming from '../Mechanisms/Confirmshaming'
import AutoplayCountdown from '../Mechanisms/AutoplayCountdown'
import TimeOut from '../Mechanisms/TimeOut'
import InfiniteScroll from '../Mechanisms/InfiniteScroll'
import SurveillanceUI from '../Mechanisms/SurveillanceUI'
import HarmonyButton from '../Mechanisms/HarmonyButton'
import './FeedPost.module.css'

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

  return (
    <article className="feed-post">
      <div className="post-header">
        <div className="avatar-placeholder" />
        <div className="header-info">
          <h3>{artwork.artistName}</h3>
          <p className="verified">✓ Verified Artist</p>
        </div>
      </div>

      <div className="post-content">
        {isUnlocked ? (
          <Link to={`/artwork/${artwork.id}`} className="artwork-link">
            <div className="artwork-placeholder">{artwork.title}</div>
            <div className="unlocked-badge">🔓 Unlocked</div>
          </Link>
        ) : (
          <div className="locked-content">
            {MechanismComponent ? (
              <MechanismComponent />
            ) : (
              <div className="mechanism-placeholder">
                Mechanism: {artwork.mechanismType}
              </div>
            )}
            <div className="locked-badge">🔒 Locked</div>
          </div>
        )}
      </div>

      <div className="post-footer">
        <div className="engagement">
          <span>❤️ {artwork.likes}</span>
          <span>💬 {artwork.comments}</span>
          <span>🔄 {artwork.shares}</span>
        </div>
      </div>
    </article>
  )
}
