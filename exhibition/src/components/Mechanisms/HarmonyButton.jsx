import { useState } from 'react'
import { useStore } from '../../store/useStore'
import styles from './HarmonyButton.module.css'

// The CAPTCHA contains hidden instructions
const CAPTCHA_TEXT = 'SEARCH transparency API labor conditions'
const CAPTCHA_SOLUTION = 'SEARCH transparency API labor conditions'

export default function HarmonyButton({ onSolve }) {
  const { solveMechanism } = useStore()
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [captchaInput, setCaptchaInput] = useState('')
  const [showError, setShowError] = useState(false)
  const [isSolved, setIsSolved] = useState(false)

  const handleAgree = () => {
    setAgreedToTerms(true)
  }

  const handleCaptchaSubmit = (e) => {
    e.preventDefault()

    if (captchaInput.trim().toLowerCase() === CAPTCHA_SOLUTION.toLowerCase()) {
      setIsSolved(true)
      solveMechanism('harmony')
      onSolve?.()
    } else {
      setShowError(true)
      setTimeout(() => setShowError(false), 2000)
    }
  }

  if (isSolved) {
    return (
      <div className={styles['harmony-solved']}>
        <h3>🔓 Mechanism Solved</h3>
        <p>You decoded the instructions hidden in mandatory assent.</p>
        <div className={styles['instructions-revealed']}>
          <h4>Search Engine Score Instructions:</h4>
          <p>Generate phantom demand by searching: <strong>{CAPTCHA_SOLUTION}</strong></p>
          <p className={styles['meta-note']}>
            (The artwork reveals how APIs can be manipulated to fabricate evidence of demand)
          </p>
        </div>
      </div>
    )
  }

  if (!agreedToTerms) {
    return (
      <div className={styles['harmony-container']}>
        <div className={styles['harmony-header']}>
          <h3>📋 COMMUNITY STANDARDS</h3>
          <p className={styles['standards-badge']}>REQUIRED AGREEMENT</p>
        </div>

        <div className={styles['terms-container']}>
          <div className={styles['terms-scroll']}>
            <h4>Terms of Service & Acceptable Use Policy</h4>

            <section>
              <h5>1. Platform Conduct</h5>
              <p>
                By using this platform, you agree to engage in a manner consistent with
                our community values of harmony, growth, and positive engagement. Content
                that disrupts platform harmony may be subject to restrictions.
              </p>
            </section>

            <section>
              <h5>2. Content Guidelines</h5>
              <p>
                All content must align with platform standards. We reserve the right to
                moderate, remove, or restrict access to content that violates these
                standards or undermines the platform experience.
              </p>
            </section>

            <section>
              <h5>3. Data Usage</h5>
              <p>
                You consent to our collection and use of interaction data to improve
                platform services, deliver personalized content, and ensure community
                safety. This data may be shared with partners who support our mission.
              </p>
            </section>

            <section>
              <h5>4. Algorithmic Curation</h5>
              <p>
                Our algorithms curate content to maximize engagement and platform value.
                By agreeing, you acknowledge that content visibility is determined by
                platform optimization systems.
              </p>
            </section>

            <section>
              <h5>5. Mandatory Assent</h5>
              <p>
                Access to platform features requires acceptance of these terms. Continued
                use constitutes ongoing agreement with any updates to these policies.
              </p>
            </section>

            <section>
              <h5>6. Dispute Resolution</h5>
              <p>
                Any disputes arising from platform use must be resolved through binding
                arbitration. You waive the right to participate in class action lawsuits.
              </p>
            </section>

            <section>
              <h5>7. Modification Rights</h5>
              <p>
                We reserve the right to modify these terms at any time without prior
                notice. Your continued use constitutes acceptance of modifications.
              </p>
            </section>
          </div>

          <div className={styles['terms-footer']}>
            <button className={styles['harmony-btn']} onClick={handleAgree}>
              ✓ I AGREE TO ALL TERMS
            </button>
            <p className={styles['mandatory-notice']}>
              Agreement is mandatory to access content
            </p>
          </div>
        </div>

        <div className={styles['harmony-hint']}>
          <p className={styles['hint-text']}>
            💡 Platform rules require mandatory assent
          </p>
          <p className={styles['hint-subtext']}>
            Hint: You must agree to proceed. The truth is hidden after compliance.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles['harmony-container']}>
      <div className={styles['harmony-header']}>
        <h3>🤖 VERIFICATION REQUIRED</h3>
        <p className={styles['verification-badge']}>PROVE YOU READ THE TERMS</p>
      </div>

      <div className={styles['captcha-container']}>
        <h4>Human Verification</h4>
        <p className={styles['captcha-instructions']}>
          To confirm you've read and understood our Terms of Service, please type
          the text shown below exactly as it appears:
        </p>

        <div className={styles['captcha-display']}>
          <div className={styles['captcha-text-container']}>
            <span className={`${styles['captcha-text']} ${styles.distorted}`}>{CAPTCHA_TEXT}</span>
          </div>
          <p className={styles['captcha-label']}>Type the text above</p>
        </div>

        <form onSubmit={handleCaptchaSubmit}>
          <input
            type="text"
            className={styles['captcha-input']}
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            placeholder="Enter the text exactly..."
            autoFocus
          />
          <button type="submit" className={styles['verify-btn']}>
            VERIFY
          </button>
        </form>

        {showError && (
          <div className={styles['error-message']}>
            ❌ Incorrect. Please try again.
          </div>
        )}

        <div className={styles['captcha-hint']}>
          <p>💡 Look carefully. The CAPTCHA contains more than verification.</p>
        </div>
      </div>

      <div className={styles['harmony-hint']}>
        <p className={styles['hint-text']}>
          💡 Mandatory assent hides instructions in plain sight
        </p>
        <p className={styles['hint-subtext']}>
          Hint: The distorted text is the actual artwork instruction
        </p>
      </div>
    </div>
  )
}
