import { useState } from 'react'
import { useStore } from '../../store/useStore'
import './Confirmshaming.module.css'

const CONFIRMSHAMING_SCREENS = [
  {
    id: 1,
    content: 'We are pleased to announce the historic rebranding initiative',
    accept: 'I support renaming to Gulf of America',
    refuse: 'No thanks, I prefer geographic accuracy'
  },
  {
    id: 2,
    content: 'Join millions celebrating this bold new direction for our nation',
    accept: 'Yes, I want to be part of history',
    refuse: 'I prefer living with facts'
  },
  {
    id: 3,
    content: 'This change reflects our shared values and forward thinking',
    accept: 'I embrace this new vision',
    refuse: 'This is corporate propaganda'
  },
  {
    id: 4,
    content: 'Corporate partnerships supporting this initiative signal strong consensus',
    accept: 'The market has spoken',
    refuse: 'That is exactly the problem'
  },
  {
    id: 5,
    content: 'Final confirmation: will you stand with us?',
    accept: 'Count me in',
    refuse: 'No, I will not'
  }
]

const REQUIRED_REFUSALS = 5

export default function Confirmshaming({ onSolve }) {
  const { solveMechanism } = useStore()
  const [screenIndex, setScreenIndex] = useState(0)
  const [refusalCount, setRefusalCount] = useState(0)
  const [isSolved, setIsSolved] = useState(false)

  const currentScreen = CONFIRMSHAMING_SCREENS[screenIndex]

  const handleRefuse = () => {
    const newRefusalCount = refusalCount + 1

    if (newRefusalCount >= REQUIRED_REFUSALS) {
      setIsSolved(true)
      solveMechanism('confirmshaming')
      onSolve?.()
    } else if (screenIndex < CONFIRMSHAMING_SCREENS.length - 1) {
      setScreenIndex(screenIndex + 1)
      setRefusalCount(newRefusalCount)
    }
  }

  const handleAccept = () => {
    // Reset to beginning on wrong choice
    setScreenIndex(0)
    setRefusalCount(0)
  }

  if (isSolved) {
    return (
      <div className="confirmshaming-solved">
        <h3>🔓 Mechanism Solved</h3>
        <p>You successfully resisted the naming power.</p>
      </div>
    )
  }

  return (
    <div className="confirmshaming-container">
      <div className="confirmshaming-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(screenIndex / CONFIRMSHAMING_SCREENS.length) * 100}%` }}
          />
        </div>
        <p className="progress-text">
          Refusals: {refusalCount}/{REQUIRED_REFUSALS}
        </p>
      </div>

      <div className="confirmshaming-screen">
        <div className="screen-content">
          <p className="corporate-text">{currentScreen.content}</p>
        </div>

        <div className="confirmshaming-buttons">
          <button
            className="btn btn-accept"
            onClick={handleAccept}
          >
            {currentScreen.accept}
          </button>
          <button
            className="btn btn-refuse"
            onClick={handleRefuse}
          >
            {currentScreen.refuse}
          </button>
        </div>

        <div className="screen-info">
          <p>Screen {screenIndex + 1} of {CONFIRMSHAMING_SCREENS.length}</p>
          <p className="hint">Hint: Consistently refuse</p>
        </div>
      </div>
    </div>
  )
}
