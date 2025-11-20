import { Link } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import FloatingIcon from '../Layout/FloatingIcon'
import './LiberatedLayout.module.css'

export default function LiberatedLayout({ children }) {
  const { resetExhibition, solvedMechanisms } = useStore()

  const handleReset = () => {
    if (window.confirm('Reset the exhibition? All progress will be lost.')) {
      resetExhibition()
      window.location.reload()
    }
  }

  return (
    <div className="liberated-layout">
      <a href="#main-content" className="skip-to-main">Skip to main content</a>
      <FloatingIcon />
      <header className="liberated-header" role="banner">
        <h1>WE SHOULD BE ALLOWED TO THINK</h1>
        <marquee aria-label="Liberation achieved. Platform defeated.">LIBERATION ACHIEVED. PLATFORM DEFEATED.</marquee>
      </header>

      <nav className="liberated-nav" aria-label="Liberated navigation">
        <ul>
          <li><Link href="/">→ HOME</Link></li>
          <li><Link href="/about">→ ABOUT</Link></li>
          <li><Link href="#" onClick={handleReset} style={{ cursor: 'pointer' }} aria-label="Reset exhibition progress">→ RESET EXHIBITION</Link></li>
        </ul>
      </nav>

      <main id="main-content" className="liberated-main" role="main">
        {children}
      </main>

      <footer className="liberated-footer" role="contentinfo">
        <pre aria-label={`A people's internet is possible. You have unlocked ${solvedMechanisms.length} of 6 mechanisms`}>{`
╔════════════════════════════════════════════╗
║  A people's internet is possible           ║
║                                            ║
║  You have unlocked ${solvedMechanisms.length}/6 mechanisms        ║
╚════════════════════════════════════════════╝
        `}</pre>
        <p>We Should Be Allowed to Think © 2025</p>
        <p>Curated by Justice Alexander Hager</p>
        <p className="footer-links">
          Part of <a href="https://falloffreedom.com" target="_blank" rel="noopener noreferrer">Fall of Freedom</a>
          {' • '}
          <a href="https://github.com/justicehager/peripheralforms" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </p>
      </footer>
    </div>
  )
}
