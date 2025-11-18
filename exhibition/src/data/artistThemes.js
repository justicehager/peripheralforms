// Artist-specific theme configurations
// Each artist gets unique styling applied to their artwork page

export const ARTIST_THEMES = {
  lynch: {
    name: 'Garrett Lynch',
    cssVariables: {
      '--artist-primary': '#1a1a1a',
      '--artist-secondary': '#f5f5f0',
      '--artist-accent': '#d4a574',
      '--artist-accent-light': '#e8d4b8',
      '--artist-border': '#e8d4b8',
      '--artist-bg': '#faf8f3',
      '--artist-text': '#2c2c2c',
      '--artist-text-light': '#666',
    },
    className: 'artist-lynch'
  },
  weigel: {
    name: 'Jennifer Weigel',
    cssVariables: {
      '--artist-primary': '#1a1a2e',
      '--artist-secondary': '#e8e8f0',
      '--artist-accent': '#ff006e',
      '--artist-accent-light': '#ff85c0',
      '--artist-border': '#d0d0e8',
      '--artist-bg': '#f5f5fb',
      '--artist-text': '#1a1a2e',
      '--artist-text-light': '#4a4a6a',
    },
    className: 'artist-weigel'
  },
  gibbins: {
    name: 'Ian Gibbins',
    cssVariables: {
      '--artist-primary': '#0a0e27',
      '--artist-secondary': '#f0f3ff',
      '--artist-accent': '#00d9ff',
      '--artist-accent-light': '#66e6ff',
      '--artist-border': '#b3e5ff',
      '--artist-bg': '#f7faff',
      '--artist-text': '#0f1419',
      '--artist-text-light': '#525672',
    },
    className: 'artist-gibbins'
  },
  'desire-engineering': {
    name: 'desire_engineering',
    cssVariables: {
      '--artist-primary': '#000',
      '--artist-secondary': '#fff',
      '--artist-accent': '#ff00ff',
      '--artist-accent-light': '#ff66ff',
      '--artist-border': '#cccccc',
      '--artist-bg': '#fafafa',
      '--artist-text': '#000',
      '--artist-text-light': '#666',
    },
    className: 'artist-desire-engineering'
  },
  'perfect-users': {
    name: 'Perfect Users',
    cssVariables: {
      '--artist-primary': '#000080',
      '--artist-secondary': '#c0c0c0',
      '--artist-accent': '#00ff00',
      '--artist-accent-light': '#80ff80',
      '--artist-border': '#808080',
      '--artist-bg': '#c0c0c0',
      '--artist-text': '#000080',
      '--artist-text-light': '#404040',
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
