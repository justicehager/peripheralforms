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
    <nav className={styles['platform-nav']}>
      <div className={styles['nav-content']}>
        <Link to="/" className={styles['nav-logo']}>
          We Should Be Allowed to Think
        </Link>
        <div className={styles['nav-links']}>
          <Link to="/" className={styles['nav-link']}>
            Home
          </Link>
          <Link to="/about" className={styles['nav-link']}>
            About
          </Link>
          <button onClick={handleReset} className={styles['nav-reset']}>
            Reset
          </button>
        </div>
      </div>
    </nav>
  )
}
