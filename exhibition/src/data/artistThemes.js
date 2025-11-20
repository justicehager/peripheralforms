// Artist-specific theme configurations
// Each artist gets unique styling applied to their artwork page

export const ARTIST_THEMES = {
  lynch: {
    name: 'Garrett Lynch IRL',
    cssVariables: {
      '--artist-primary': '#0a1628', // Deep cartographic blue
      '--artist-secondary': '#e8ebe8',
      '--artist-accent': '#ff4500', // Rebellious orange-red (resistance)
      '--artist-accent-light': '#ff7f50',
      '--artist-border': '#2a4a6a', // Border-like blue
      '--artist-bg': '#f0f4f8', // Map paper background
      '--artist-text': '#0a1628',
      '--artist-text-light': '#4a5a6a',
    },
    className: 'artist-lynch'
  },
  weigel: {
    name: 'Jennifer Weigel',
    cssVariables: {
      '--artist-primary': '#2b2b2b', // Institutional dark gray
      '--artist-secondary': '#d4d4d0',
      '--artist-accent': '#e8d44d', // Harsh fluorescent yellow (anxiety)
      '--artist-accent-light': '#f0e68c',
      '--artist-border': '#8a8a80',
      '--artist-bg': '#e8e8e0', // Institutional beige
      '--artist-text': '#2b2b2b',
      '--artist-text-light': '#5a5a50',
    },
    className: 'artist-weigel'
  },
  gibbins: {
    name: 'Ian Gibbins',
    cssVariables: {
      '--artist-primary': '#1a2e3e', // Clinical dark blue
      '--artist-secondary': '#f5f5f5',
      '--artist-accent': '#5da271', // Natural world green (watching)
      '--artist-accent-light': '#8ec9a0',
      '--artist-border': '#c8d8e0', // Sterile blue-gray
      '--artist-bg': '#fafcfd', // Clinical white
      '--artist-text': '#1a2e3e',
      '--artist-text-light': '#607580',
    },
    className: 'artist-gibbins'
  },
  'desire-engineering': {
    name: 'desire_engineering',
    cssVariables: {
      '--artist-primary': '#1a1a1a', // System black
      '--artist-secondary': '#e0e0e0',
      '--artist-accent': '#4285f4', // CAPTCHA blue (checkbox culture)
      '--artist-accent-light': '#8ab4f8',
      '--artist-border': '#999999', // System gray
      '--artist-bg': '#f5f5f5', // Form background
      '--artist-text': '#1a1a1a',
      '--artist-text-light': '#5f6368', // Muted system text
    },
    className: 'artist-desire-engineering'
  },
  'perfect-users': {
    name: 'Perfect Users',
    cssVariables: {
      '--artist-primary': '#0e0e0e', // Dark mode background
      '--artist-secondary': '#2a2a2a',
      '--artist-accent': '#64b5f6', // Telegram blue (private chat)
      '--artist-accent-light': '#90caf9',
      '--artist-border': '#3a3a3a', // Encrypted border
      '--artist-bg': '#1a1a1a', // Dark canvas
      '--artist-text': '#e0e0e0', // Light text on dark
      '--artist-text-light': '#a0a0a0',
    },
    className: 'artist-perfect-users'
  },
  'search-engine-scores': {
    name: 'Search Engine Scores',
    cssVariables: {
      '--artist-primary': '#1f2937',
      '--artist-secondary': '#f3f4f6',
      '--artist-accent': '#3b82f6',
      '--artist-accent-light': '#93c5fd',
      '--artist-border': '#e5e7eb',
      '--artist-bg': '#f9fafb',
      '--artist-text': '#1f2937',
      '--artist-text-light': '#6b7280',
    },
    className: 'artist-search-engine-scores'
  }
}

export const getArtistTheme = (artworkId) => {
  return ARTIST_THEMES[artworkId]
}
