import { Link } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import './Navigation.module.css'

export default function Navigation() {
  const { resetExhibition } = useStore()

  const handleReset = () => {
    if (window.confirm('Reset the exhibition? All progress will be lost.')) {
      resetExhibition()
      window.location.reload()
    }
  }

  return (
    <nav className="platform-nav">
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          We Should Be Allowed to Think
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <button onClick={handleReset} className="nav-reset">
            Reset
          </button>
        </div>
      </div>
    </nav>
  )
}
