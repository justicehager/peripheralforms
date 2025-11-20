import { Link } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import styles from './Navigation.module.css'

export default function Navigation() {
  const { resetExhibition } = useStore()

  const handleReset = () => {
    if (window.confirm('Reset the exhibition? All progress will be lost.')) {
      resetExhibition()
      window.location.reload()
    }
  }

  return (
    <nav className={styles['platform-nav']} aria-label="Main navigation">
      <div className={styles['nav-content']}>
        <Link to="/" className={styles['nav-logo']} aria-label="We Should Be Allowed to Think - Home">
          We Should Be Allowed to Think
        </Link>
        <div className={styles['nav-links']} role="navigation" aria-label="Site navigation">
          <Link to="/" className={styles['nav-link']} aria-current="page">
            Home
          </Link>
          <Link to="/about" className={styles['nav-link']}>
            About
          </Link>
          <button onClick={handleReset} className={styles['nav-reset']} aria-label="Reset all exhibition progress">
            Reset
          </button>
        </div>
      </div>
    </nav>
  )
}
