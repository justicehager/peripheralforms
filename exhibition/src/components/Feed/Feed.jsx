import { useStore } from '../../store/useStore'
import FeedPost from './FeedPost'
import { ARTWORKS } from '../../data/artworks'
import styles from './Feed.module.css'

export default function Feed() {
  const { solvedMechanisms } = useStore()

  return (
    <div className={styles['feed-container']}>
      <div className={styles['feed-grid']}>
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
