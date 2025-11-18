import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles['platform-header']}>
      <div className={styles['header-content']}>
        <h1 className={styles['header-title']}>Recommended for You</h1>
        <p className={styles['header-subtitle']}>Curated exhibition content</p>
      </div>
    </header>
  )
}
