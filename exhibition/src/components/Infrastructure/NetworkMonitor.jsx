import { useState, useEffect } from 'react'
import './NetworkMonitor.css'

export default function NetworkMonitor() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      const fakeRequest = {
        method: ['GET', 'POST', 'PUT'][Math.floor(Math.random() * 3)],
        endpoint: ['/api/track-engagement', '/api/user-analytics', '/api/behavioral-data', '/api/scroll-position'][Math.floor(Math.random() * 4)],
        status: Math.random() > 0.2 ? 200 : Math.random() > 0.5 ? 201 : 204,
        timestamp: new Date().toLocaleTimeString(),
        duration: Math.floor(Math.random() * 500) + 50 + 'ms'
      }
      setRequests(prev => [fakeRequest, ...prev].slice(0, 8))
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="network-monitor">
      <div className="monitor-header">NETWORK ACTIVITY</div>
      {requests.map((req, i) => (
        <div key={i} className="network-request">
          <span className={`method method-${req.method}`}>{req.method}</span>
          <span className="endpoint">{req.endpoint}</span>
          <span className={`status status-${req.status}`}>{req.status}</span>
          <span className="time">{req.timestamp}</span>
          <span className="duration">{req.duration}</span>
        </div>
      ))}
    </div>
  )
}
