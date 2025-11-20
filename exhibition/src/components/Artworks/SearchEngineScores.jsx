import { useState } from 'react'
import './SearchEngineScores.css'
import ImageLightbox from '../Artwork/ImageLightbox'

const SEARCHES = [
  {
    query: 'APIs for cognitive security protecting intelligence from neurohazards',
    image: '/exhibition/artworks/search_engine_scores/APIs for cognitive security protecting intelligence from neurohazards.png'
  },
  {
    query: 'downranked results booster chrome extension',
    image: '/exhibition/artworks/search_engine_scores/downranked results booster chrome extension.png'
  },
  {
    query: 'facist in my head, facist in my search',
    image: '/exhibition/artworks/search_engine_scores/facist in my head, facist in my search.png'
  },
  {
    query: 'stop autocorrecting my impulse',
    image: '/exhibition/artworks/search_engine_scores/stop autocorrecting my impulse.png'
  },
  {
    query: 'we should be allowed to search our thoughts',
    image: '/exhibition/artworks/search_engine_scores/we should be allowed to search our thoughts.png'
  },
  {
    query: 'search results im not allowed to see',
    image: '/exhibition/artworks/search_engine_scores/search results im not allowed to see.png'
  },
  {
    query: 'the policeman in my head is also in my search results',
    image: '/exhibition/artworks/search_engine_scores/the policeman in my head is also in my search results.png'
  }
]

export default function SearchEngineScores() {
  const [lightboxImages, setLightboxImages] = useState(null)
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0)

  const openLightbox = (startIndex) => {
    setLightboxImages(SEARCHES.map(s => s.image))
    setLightboxStartIndex(startIndex)
  }

  const closeLightbox = () => {
    setLightboxImages(null)
  }

  const getGoogleSearchUrl = (query) => {
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`
  }

  return (
    <div className="search-engine-scores">
      <div className="ses-instructions">
        <h2 className="ses-title">Perform These Searches</h2>
        <p className="ses-description">
          Part of this artwork is to conduct the searches yourself. Click any search query below to perform it on Google.
          Results will vary based on your personalization settings, demonstrating how control mechanisms adapt to each user.
        </p>
      </div>

      <div className="ses-searches thumbnail-gallery">
        {SEARCHES.map((search, index) => (
          <div key={index} className="ses-search-item gallery-thumbnail">
            <div className="ses-search-header">
              <span className="ses-search-number">{index + 1}</span>
              <a
                href={getGoogleSearchUrl(search.query)}
                target="_blank"
                rel="noopener noreferrer"
                className="ses-search-link"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="ses-google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="ses-query-text">{search.query}</span>
              </a>
            </div>
            <div
              className="ses-screenshot-container"
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openLightbox(index)
                }
              }}
            >
              <img
                src={search.image}
                alt={`Search results for: ${search.query}`}
                className="ses-screenshot gallery-thumbnail-image"
              />
              <div className="ses-screenshot-overlay gallery-overlay">
                <span className="ses-zoom-icon gallery-icon">🔍</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {lightboxImages && (
        <ImageLightbox
          images={lightboxImages}
          startIndex={lightboxStartIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  )
}
