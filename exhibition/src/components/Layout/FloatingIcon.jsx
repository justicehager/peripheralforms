import styles from './FloatingIcon.module.css'

export default function FloatingIcon() {
  return (
    <a
      href="https://peripheralforms.com"
      className={styles['floating-icon']}
      aria-label="Visit Peripheral Forms"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={styles['icon-text']}>PF</span>
    </a>
  )
}
