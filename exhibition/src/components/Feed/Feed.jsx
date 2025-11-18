import { useStore } from '../../store/useStore'
import FeedPost from './FeedPost'
import { ARTWORKS } from '../../data/artworks'
import './Feed.module.css'

export default function Feed() {
  const { solvedMechanisms } = useStore()

  // Debug: Log solved mechanisms
  console.log('Feed - Solved mechanisms:', solvedMechanisms)

  return (
    <div className="feed-container">
      <div className="feed-grid">
        {ARTWORKS.map(artwork => (
          <FeedPost
            key={artwork.id}
            artwork={artwork}
            isUnlocked={solvedMechanisms.includes(artwork.mechanismId)}
          />
        ))}
      </div>
    </div>
  )
}
