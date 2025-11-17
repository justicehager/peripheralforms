import { useState, useEffect } from 'react'
import './ConsoleErrors.module.css'

export default function ConsoleErrors() {
  const [errors, setErrors] = useState([])

  const errorMessages = [
    'TypeError: cannot read property \'preferences\' of undefined',
    'ReferenceError: surveillanceIndex is not defined',
    'Uncaught SyntaxError: Unexpected identifier \'trackingPixel\'',
    'Warning: Non-existent memory segment access',
    'ConsoleError: Failed to load tracking script from CDN',
    'Fatal: Behavioral model overflow detected',
    'ReferenceError: consentCookie is not accessible',
    'DOMException: Quota exceeded writing to localStorage'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const newError = {
        message: errorMessages[Math.floor(Math.random() * errorMessages.length)],
        timestamp: new Date().toLocaleTimeString(),
        id: Math.random(),
        type: Math.random() > 0.7 ? 'error' : 'warning'
      }
      setErrors(prev => [...prev, newError].slice(-5))
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="console-errors">
      <div className="console-header">CONSOLE</div>
      {errors.map((err) => (
        <div key={err.id} className={`console-line ${err.type}`}>
          <span className="console-type">[{err.type.toUpperCase()}]</span>
          <span className="console-message">{err.message}</span>
          <span className="console-time">{err.timestamp}</span>
        </div>
      ))}
    </div>
  )
}
