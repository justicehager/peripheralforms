import { Link } from 'react-router-dom'
import { useStore } from '../../store/useStore'
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
      <header className="liberated-header">
        <h1>WE SHOULD BE ALLOWED TO THINK</h1>
        <marquee>LIBERATION ACHIEVED. PLATFORM DEFEATED.</marquee>
      </header>

      <nav className="liberated-nav">
        <ul>
          <li><Link href="/">→ HOME</Link></li>
          <li><Link href="/about">→ ABOUT</Link></li>
          <li><Link href="#" onClick={handleReset} style={{ cursor: 'pointer' }}>→ RESET EXHIBITION</Link></li>
        </ul>
      </nav>

      <main className="liberated-main">
        {children}
      </main>

      <footer className="liberated-footer">
        <pre>{`
╔════════════════════════════════════════════╗
║  A people's internet is possible           ║
║                                            ║
║  You have unlocked ${solvedMechanisms.length}/6 mechanisms        ║
╚════════════════════════════════════════════╝
        `}</pre>
        <p>We Should Be Allowed to Think © 2025</p>
        <p>Curated by Justice Alexander Hager</p>
      </footer>
    </div>
  )
}
