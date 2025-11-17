import { useEffect } from 'react'
import { useStore } from './store/useStore'

export default function App() {
  const { currentTheme } = useStore()

  // Set theme on document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [currentTheme])

  return null // Router will provide the actual content
}
