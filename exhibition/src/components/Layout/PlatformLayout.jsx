import { useStore } from '../../store/useStore'
import Header from './Header'
import Navigation from './Navigation'
import InfrastructureOverlay from '../Infrastructure/InfrastructureOverlay'
import styles from './PlatformLayout.module.css'

export default function PlatformLayout({ children }) {
  const { infrastructureVisibility } = useStore()

  return (
    <div className={styles['platform-layout']}>
      <a href="#main-content" className="skip-to-main">Skip to main content</a>
      <InfrastructureOverlay visibility={infrastructureVisibility} />
      <Header />
      <Navigation />
      <main id="main-content" className={styles['platform-main']} role="main">
        {children}
      </main>
      <footer className={styles['platform-footer']} role="contentinfo">
        <p>&copy; 2025 We Should Be Allowed to Think | Peripheral Forms</p>
      </footer>
    </div>
  )
}
