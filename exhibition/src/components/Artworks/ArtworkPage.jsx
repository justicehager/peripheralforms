import { useParams, useNavigate, Link } from 'react-router-dom'
import { getArtworkById } from '../../data/artworks'
import './ArtworkPage.module.css'

export default function ArtworkPage() {
  const { artworkId } = useParams()
  const navigate = useNavigate()
  const artwork = getArtworkById(artworkId)

  if (!artwork) {
    return (
      <div className="artwork-error">
        <h2>Artwork not found</h2>
        <Link to="/">Back to home</Link>
      </div>
    )
  }

  return (
    <div className="artwork-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <article className="artwork-content">
        <h1>{artwork.title}</h1>
        <p className="artwork-meta">
          {artwork.artistName} ({artwork.year}) | {artwork.medium}
        </p>

        <div className="artwork-media">
          <div className="media-placeholder">
            [Artwork content would display here]
          </div>
        </div>

        <section className="artwork-description">
          <h2>Description</h2>
          <p>{artwork.description}</p>
        </section>

        <section className="artist-statement">
          <h2>Artist Statement</h2>
          <p>{artwork.artistStatement}</p>
        </section>
      </article>
    </div>
  )
}
