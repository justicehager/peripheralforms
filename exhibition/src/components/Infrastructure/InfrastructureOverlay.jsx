import { useStore } from '../../store/useStore'
import NetworkMonitor from './NetworkMonitor'
import DatabaseLog from './DatabaseLog'
import ConsoleErrors from './ConsoleErrors'
import './InfrastructureOverlay.module.css'

export default function InfrastructureOverlay({ visibility }) {
  const level = Math.ceil((visibility / 100) * 3)

  return (
    <>
      {level >= 1 && <NetworkMonitor />}
      {level >= 2 && <DatabaseLog />}
      {level >= 3 && <ConsoleErrors />}
    </>
  )
}
