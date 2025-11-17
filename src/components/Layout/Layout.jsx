import { Outlet } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { useEffect } from 'react'
import PlatformLayout from './PlatformLayout'
import LiberatedLayout from '../EndingState/LiberatedLayout'
import './Layout.module.css'

export default function Layout() {
  const { currentTheme } = useStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [currentTheme])

  return currentTheme === 'resistance' ? (
    <LiberatedLayout>
      <Outlet />
    </LiberatedLayout>
  ) : (
    <PlatformLayout>
      <Outlet />
    </PlatformLayout>
  )
}
