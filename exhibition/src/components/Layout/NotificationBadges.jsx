import { useState, useEffect } from 'react'
import { useStore } from '../../store/useStore'
import styles from './NotificationBadges.module.css'

const NOTIFICATION_MESSAGES = {
  0: [
    { text: "🎉 You're doing great!", type: "positive" },
    { text: "✨ Keep exploring!", type: "positive" },
    { text: "👀 New content unlocked!", type: "reward" },
    { text: "💫 You're almost there!", type: "encouragement" }
  ],
  1: [
    { text: "⚡ Don't miss out!", type: "fomo" },
    { text: "🔥 Trending now!", type: "urgency" },
    { text: "⏰ Limited time!", type: "pressure" },
    { text: "👁️ Others are watching...", type: "social-proof" }
  ],
  2: [
    { text: "⚠️ Don't stop now!", type: "pressure" },
    { text: "⏳ Time is running out!", type: "urgency" },
    { text: "📊 Your activity is being tracked", type: "awareness" },
    { text: "🎯 Complete your profile!", type: "manipulation" }
  ],
  3: [
    { text: "👁️ We're watching", type: "surveillance" },
    { text: "📡 Your data is being collected", type: "threat" },
    { text: "🔒 Access expiring soon", type: "manipulation" },
    { text: "⚡ Engagement required", type: "control" }
  ]
}

export default function NotificationBadges() {
  const { solvedMechanisms } = useStore()
  const [activeNotifications, setActiveNotifications] = useState([])
  const [notificationId, setNotificationId] = useState(0)

  // Determine escalation level based on solved mechanisms
  const escalationLevel = Math.min(Math.floor(solvedMechanisms.length / 2), 3)

  useEffect(() => {
    // Add new notification every 5-8 seconds
    const interval = setInterval(() => {
      const messages = NOTIFICATION_MESSAGES[escalationLevel]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]

      const newNotification = {
        id: notificationId,
        ...randomMessage,
        position: {
          top: Math.random() * 70 + 10, // 10-80% from top
          left: Math.random() > 0.5 ? 'left' : 'right'
        }
      }

      setActiveNotifications(prev => [...prev, newNotification])
      setNotificationId(prev => prev + 1)

      // Remove notification after 4-6 seconds
      setTimeout(() => {
        setActiveNotifications(prev =>
          prev.filter(notif => notif.id !== newNotification.id)
        )
      }, 4000 + Math.random() * 2000)
    }, 5000 + Math.random() * 3000)

    return () => clearInterval(interval)
  }, [escalationLevel, notificationId])

  // Don't show notifications in resistance theme
  const theme = document.documentElement.getAttribute('data-theme')
  if (theme === 'resistance') return null

  return (
    <>
      {activeNotifications.map(notification => (
        <div
          key={notification.id}
          className={`${styles.notification} ${styles[notification.type]}`}
          style={{
            [notification.position.left]: '20px',
            top: `${notification.position.top}%`,
            animationDelay: '0s'
          }}
        >
          {notification.text}
        </div>
      ))}
    </>
  )
}
