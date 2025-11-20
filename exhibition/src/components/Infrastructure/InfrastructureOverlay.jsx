import { useStore } from '../../store/useStore'
import DatabaseLog from './DatabaseLog'
import ConsoleErrors from './ConsoleErrors'
import './InfrastructureOverlay.css'

export default function InfrastructureOverlay({ visibility }) {
  const level = Math.ceil((visibility / 100) * 3)

  return (
    <>
      {level >= 1 && <DatabaseLog />}
      {level >= 2 && <ConsoleErrors />}
    </>
  )
}
