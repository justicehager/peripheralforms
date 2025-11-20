import { useState, useEffect } from 'react'
import './DatabaseLog.css'

export default function DatabaseLog() {
  const [queries, setQueries] = useState([])

  const databaseQueries = [
    'SELECT * FROM users WHERE id=?',
    'UPDATE engagement_metrics SET scroll_depth=?',
    'INSERT INTO tracking_log (user_id, action) VALUES (?, ?)',
    'SELECT behavioral_data FROM profiles WHERE user_id=?',
    'UPDATE surveillance_index SET timestamp=NOW()',
    'INSERT INTO click_patterns (pattern_hash) VALUES (?)',
    'SELECT * FROM attention_events WHERE timestamp > ?',
    'UPDATE preference_model SET bias=preference_model.bias + 1'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const newQuery = {
        query: databaseQueries[Math.floor(Math.random() * databaseQueries.length)],
        timestamp: new Date().toLocaleTimeString(),
        id: Math.random()
      }
      setQueries(prev => [...prev, newQuery].slice(-6))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="database-log">
      <div className="log-header">DATABASE LOG</div>
      {queries.map((q) => (
        <div key={q.id} className="database-query">
          <span className="query-marker">→</span>
          <span className="query-text">{q.query}</span>
          <span className="query-time">{q.timestamp}</span>
        </div>
      ))}
    </div>
  )
}
