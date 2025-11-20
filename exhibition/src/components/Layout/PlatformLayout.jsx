import Header from './Header'
import Navigation from './Navigation'
import FloatingIcon from './FloatingIcon'
import NotificationBadges from './NotificationBadges'
import styles from './PlatformLayout.module.css'

export default function PlatformLayout({ children }) {
  return (
    <div className={styles['platform-layout']}>
      <a href="#main-content" className="skip-to-main">Skip to main content</a>
      <NotificationBadges />
      <FloatingIcon />
      <Header />
      <Navigation />
      <main id="main-content" className={styles['platform-main']} role="main">
        {children}
      </main>
      <footer className={styles['platform-footer']} role="contentinfo">
        <p>&copy; 2025 We Should Be Allowed to Think | Peripheral Forms</p>
        <p className={styles['footer-links']}>
          Part of <a href="https://falloffreedom.com" target="_blank" rel="noopener noreferrer">Fall of Freedom</a>
          {' • '}
          <a href="https://github.com/justicehager/peripheralforms" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </p>
      </footer>
    </div>
  )
}
