import { useStore } from '../../store/useStore'
import Header from './Header'
import Navigation from './Navigation'
import InfrastructureOverlay from '../Infrastructure/InfrastructureOverlay'
import styles from './PlatformLayout.module.css'

export default function PlatformLayout({ children }) {
  const { infrastructureVisibility } = useStore()

  return (
    <div className={styles['platform-layout']}>
      <InfrastructureOverlay visibility={infrastructureVisibility} />
      <Header />
      <Navigation />
      <main className={styles['platform-main']}>
        {children}
      </main>
      <footer className={styles['platform-footer']}>
        <p>&copy; 2025 We Should Be Allowed to Think | Peripheral Forms</p>
      </footer>
    </div>
  )
}
