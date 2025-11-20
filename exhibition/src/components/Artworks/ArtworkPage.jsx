import { useParams, useNavigate, Link } from 'react-router-dom'
import { getArtworkById } from '../../data/artworks'
import './ArtworkPage.css'
import './ArtworkPageThemes.css'
import { getArtistTheme } from '../../data/artistThemes'

// Helper function to parse video URLs and generate embed codes
function getVideoEmbedUrl(url) {
  if (!url) return null

  // Vimeo - handle both regular and unlisted videos with hashes
  if (url.includes('vimeo.com')) {
    // Extract video ID and optional hash
    // Format 1: https://vimeo.com/408259816
    // Format 2: https://vimeo.com/1135119675/acadc0caba
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)(?:\/(\w+))?/)
    if (vimeoMatch) {
      const videoId = vimeoMatch[1]
      const hash = vimeoMatch[2]
      return hash
        ? `https://player.vimeo.com/video/${videoId}?h=${hash}`
        : `https://player.vimeo.com/video/${videoId}`
    }
  }

  // YouTube - handle various formats
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    // Format 1: https://www.youtube.com/watch?v=VIDEO_ID
    const youtubeMatch = url.match(/[?&]v=([^&]+)/)
    if (youtubeMatch) {
      return `https://www.youtube-nocookie.com/embed/${youtubeMatch[1]}`
    }
    // Format 2: https://youtu.be/VIDEO_ID
    const youtubeShortMatch = url.match(/youtu\.be\/([^?]+)/)
    if (youtubeShortMatch) {
      return `https://www.youtube-nocookie.com/embed/${youtubeShortMatch[1]}`
    }
  }

  return null
}

export default function ArtworkPage() {
  const { artworkId } = useParams()
  const navigate = useNavigate()
  const artwork = getArtworkById(artworkId)
  const artistTheme = getArtistTheme(artworkId)

  if (!artwork) {
    return (
      <div className="artwork-error">
        <h2>Artwork not found</h2>
        <Link to="/">Back to home</Link>
      </div>
    )
  }

  // Get video embed URL if available
  const videoEmbedUrl = getVideoEmbedUrl(artwork.vimeoUrl || artwork.youtubeUrl)

  return (
    <div
      className="artwork-page"
      data-artist={artworkId}
      style={artistTheme?.cssVariables || {}}
    >
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <article className="artwork-content">
        <h1>{artwork.title}</h1>
        <p className="artwork-meta">
          {artwork.artistName}
          {artwork.pronouns && ` (${artwork.pronouns})`} ({artwork.year}) | {artwork.medium}
        </p>

        <div className="artwork-media">
          {videoEmbedUrl ? (
            <div className="video-embed-container">
              <iframe
                src={videoEmbedUrl}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={artwork.title}
                className="video-embed"
              ></iframe>
            </div>
          ) : (
            <div className="media-placeholder">
              <span className="thumbnail-large">{artwork.thumbnail}</span>
              <p>[Artwork content would display here]</p>
            </div>
          )}
        </div>

        <section className="artwork-description">
          <h2>Description</h2>
          <p>{artwork.description}</p>
        </section>

        <section className="artist-statement">
          <h2>Artist Statement</h2>
          <p style={{ whiteSpace: 'pre-line' }}>{artwork.artistStatement}</p>
        </section>

        {artwork.thematicStatement && (
          <section className="thematic-statement">
            <h2>How This Work Addresses the Theme</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{artwork.thematicStatement}</p>
          </section>
        )}

        {artwork.presentationNotes && (
          <section className="presentation-notes">
            <h2>Presentation Notes</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{artwork.presentationNotes}</p>
          </section>
        )}

        <div className="artwork-links">
          {artwork.websiteUrl && (
            <a href={artwork.websiteUrl} target="_blank" rel="noopener noreferrer" className="artwork-link">
              View Project Website →
            </a>
          )}
          {artwork.portfolioUrl && (
            <a href={artwork.portfolioUrl} target="_blank" rel="noopener noreferrer" className="artwork-link">
              Artist Portfolio →
            </a>
          )}
          {artwork.vimeoUrl && (
            <a href={artwork.vimeoUrl} target="_blank" rel="noopener noreferrer" className="artwork-link">
              Watch on Vimeo →
            </a>
          )}
          {artwork.youtubeUrl && (
            <a href={artwork.youtubeUrl} target="_blank" rel="noopener noreferrer" className="artwork-link">
              Watch on YouTube →
            </a>
          )}
        </div>
      </article>
    </div>
  )
}
