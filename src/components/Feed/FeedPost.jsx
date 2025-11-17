import { Link } from 'react-router-dom'
import './FeedPost.module.css'

export default function FeedPost({ artwork, isUnlocked }) {
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
            <div className="mechanism-placeholder">
              Mechanism: {artwork.mechanismType}
            </div>
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
