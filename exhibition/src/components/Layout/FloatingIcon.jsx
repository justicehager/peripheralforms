import { Link } from 'react-router-dom'
import styles from './FloatingIcon.module.css'

export default function FloatingIcon() {
  return (
    <Link to="/" className={styles['floating-icon']} aria-label="Return to homepage">
      <span className={styles['icon-text']}>pf</span>
    </Link>
  )
}
