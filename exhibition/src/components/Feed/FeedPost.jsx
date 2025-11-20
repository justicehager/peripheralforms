import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import MechanismOverlay from '../Mechanisms/MechanismOverlay'
import styles from './FeedPost.module.css'

export default function FeedPost({ artwork, isUnlocked }) {
  const [showOverlay, setShowOverlay] = useState(false)
  const toggleMechanism = useStore(state => state.toggleMechanism)

  const handlePostClick = () => {
    if (!isUnlocked) {
      setShowOverlay(true)
    }
  }

  return (
    <>
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
              <div className={styles['thumbnail']}>{artwork.thumbnail}</div>
              <div className={styles['artwork-title']}>{artwork.title}</div>
              <div className={styles['unlocked-badge']}>🔓 Unlocked</div>
            </Link>
          ) : (
            <div className={styles['locked-content']} onClick={handlePostClick}>
              <div className={styles['thumbnail']}>{artwork.thumbnail}</div>
              <div className={styles['artwork-title']}>{artwork.title}</div>
              <button className={styles['view-button']}>
                👁️ View
              </button>
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
          <button
            className={styles['test-toggle']}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggleMechanism(artwork.mechanismId)
            }}
            title="Toggle solved state (testing)"
          >
            {isUnlocked ? '🔓 Unlock' : '🔒 Lock'}
          </button>
        </div>
      </article>

      {showOverlay && !isUnlocked && (
        <MechanismOverlay
          artwork={artwork}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </>
  )
}
