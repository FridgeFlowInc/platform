import { useState, useEffect } from 'react'
import { Outlet } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import { delay } from '@/lib/delay'

export const FullscreenPreloader = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [opacity, setOpacity] = useState(1)
  const { checkAuthentication, checkedAuthentication } = useAuthStore(
    (state) => state.auth
  )

  useEffect(() => {
    const performAuthCheck = async () => {
      await delay(300)
      await checkAuthentication()
    }

    performAuthCheck()
  }, [])

  useEffect(() => {
    if (checkedAuthentication) {
      setOpacity(0)
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [checkedAuthentication])

  return (
    <>
      {isVisible && (
        <div
          role='status'
          className='fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-300 ease-in-out'
          style={{ opacity }}
        >
          <div className='h-12 w-12'>
            <div className='h-full w-full rounded-full border-5 border-muted animate-spin border-t-foreground' />
          </div>
        </div>
      )}
      {checkedAuthentication && <Outlet />}
    </>
  )
}
