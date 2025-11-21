import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import MechanismOverlay from '../Mechanisms/MechanismOverlay'
import styles from './FeedPost.module.css'

export default function FeedPost({ artwork, isUnlocked }) {
  const [showOverlay, setShowOverlay] = useState(false)

  const handlePostClick = () => {
    if (!isUnlocked) {
      setShowOverlay(true)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePostClick()
    }
  }

  return (
    <>
      <article className={styles['feed-post']} aria-label={`Artwork by ${artwork.artistName}: ${artwork.title}`}>
        <div className={styles['post-header']}>
          <div className={styles['avatar-placeholder']} role="img" aria-label={`${artwork.artistName} avatar`}>
            {artwork.avatar}
          </div>
          <div className={styles['header-info']}>
            <h3>{artwork.artistName}</h3>
            <p className={styles['verified']}>✓ Verified Artist</p>
          </div>
        </div>

        <div className={styles['post-content']}>
          {isUnlocked ? (
            <Link
              to={`/artwork/${artwork.id}`}
              className={styles['artwork-link']}
              aria-label={`View unlocked artwork: ${artwork.title}`}
            >
              <img src={artwork.thumbnail} alt={artwork.title} className={styles['thumbnail']} />
              <div className={styles['artwork-title']}>{artwork.title}</div>
              <div className={styles['unlocked-badge']} role="status">🔓 Unlocked</div>
            </Link>
          ) : (
            <div
              className={styles['locked-content']}
              onClick={handlePostClick}
              onKeyPress={handleKeyPress}
              role="button"
              tabIndex={0}
              aria-label={`View locked artwork: ${artwork.title}. Press Enter to unlock.`}
            >
              <img src={artwork.thumbnail} alt={artwork.title} className={styles['thumbnail']} />
              <div className={styles['artwork-title']}>{artwork.title}</div>
              <button className={styles['view-button']} aria-label={`View ${artwork.title}`}>
                👁️ View
              </button>
              <div className={styles['locked-badge']} role="status">🔒 Locked</div>
            </div>
          )}
        </div>

        <div className={styles['post-footer']}>
          <div className={styles['engagement']} role="group" aria-label="Engagement metrics">
            <span aria-label={`${artwork.likes} likes`}>❤️ {artwork.likes}</span>
            <span aria-label={`${artwork.comments} comments`}>💬 {artwork.comments}</span>
            <span aria-label={`${artwork.shares} shares`}>🔄 {artwork.shares}</span>
          </div>
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
