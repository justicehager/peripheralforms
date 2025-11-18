import { useState } from 'react'
import { useStore } from '../../store/useStore'
import styles from './Confirmshaming.module.css'

const CONFIRMSHAMING_SCREENS = [
  {
    id: 1,
    content: '🗳️ URGENT POLL: Do you SUPPORT renaming the Gulf of Mexico to GULF OF AMERICA? 🇺🇸',
    accept: '✓ YES! Make America GREAT!',
    refuse: 'No thanks, I prefer geographic accuracy'
  },
  {
    id: 2,
    content: 'BREAKING: 73% of REAL PATRIOTS already voted YES! Where do YOU stand?!',
    accept: '✓ Count me in with the MAJORITY!',
    refuse: 'I prefer living with facts'
  },
  {
    id: 3,
    content: 'FINAL HOURS! This historic change needs YOUR voice! Don\'t be left behind!',
    accept: '✓ I\'m voting YES right now!',
    refuse: 'This is corporate propaganda'
  },
  {
    id: 4,
    content: '🚨 LAST CHANCE! Join MILLIONS standing for American greatness! Vote NOW! 🚨',
    accept: '✓ ABSOLUTELY YES!',
    refuse: 'That is exactly the problem'
  },
  {
    id: 5,
    content: '⚠️ POLL CLOSING SOON! Will you STAND WITH AMERICA or sit on the sidelines? ⚠️',
    accept: '✓ YES! I STAND WITH AMERICA!',
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
      <div className={styles['confirmshaming-solved']}>
        <h3>🔓 POLL REJECTED</h3>
        <p>You successfully resisted the manufactured consensus.</p>
      </div>
    )
  }

  return (
    <div className={styles['confirmshaming-container']}>
      <div className={styles['confirmshaming-progress']}>
        <div className={styles['progress-bar']}>
          <div
            className={styles['progress-fill']}
            style={{ width: `${(screenIndex / CONFIRMSHAMING_SCREENS.length) * 100}%` }}
          />
        </div>
        <p className={styles['progress-text']}>
          Refusals: {refusalCount}/{REQUIRED_REFUSALS}
        </p>
      </div>

      <div className={styles['confirmshaming-screen']}>
        <div className={styles['screen-content']}>
          <p className={styles['corporate-text']}>{currentScreen.content}</p>
        </div>

        <div className={styles['confirmshaming-buttons']}>
          <button
            className={`${styles.btn} ${styles['btn-accept']}`}
            onClick={handleAccept}
          >
            {currentScreen.accept}
          </button>
          <button
            className={`${styles.btn} ${styles['btn-refuse']}`}
            onClick={handleRefuse}
          >
            {currentScreen.refuse}
          </button>
        </div>

        <div className={styles['screen-info']}>
          <p>Question {screenIndex + 1} of {CONFIRMSHAMING_SCREENS.length}</p>
          <p className={styles.hint}>Your vote matters! (Hint: Resist the pressure)</p>
        </div>
      </div>
    </div>
  )
}
