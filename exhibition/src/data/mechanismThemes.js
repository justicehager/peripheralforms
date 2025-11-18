// Mechanism-specific theme configurations
// Each mechanism can have its own visual style/theme

export const MECHANISM_THEMES = {
  'confirmshaming': {
    name: 'political-poll',
    className: 'theme-political-poll',
    description: 'Aggressive online political poll aesthetic'
  },
  'autoplay': {
    name: 'default',
    className: 'theme-default',
    description: 'Default overlay theme'
  },
  'timeout': {
    name: 'default',
    className: 'theme-default',
    description: 'Default overlay theme'
  },
  'infinite_scroll': {
    name: 'default',
    className: 'theme-default',
    description: 'Default overlay theme'
  },
  'surveillance': {
    name: 'default',
    className: 'theme-default',
    description: 'Default overlay theme'
  },
  'harmony': {
    name: 'default',
    className: 'theme-default',
    description: 'Default overlay theme'
  }
}

export const getMechanismTheme = (mechanismId) => {
  return MECHANISM_THEMES[mechanismId] || MECHANISM_THEMES['autoplay']
}
