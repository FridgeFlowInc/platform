import Cookies from 'js-cookie'
import { create } from 'zustand'
import { checkAuth } from '@/api/v1/checkAuth'

const ACCESS_TOKEN = 'fridgeflow:backend'

interface AuthState {
  auth: {
    isAuthenticated: boolean
    checkedAuthentication: boolean
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    checkAuthentication: () => void
  }
}

export const useAuthStore = create<AuthState>((set) => {
  const cookieState = Cookies.get(ACCESS_TOKEN)
  const initToken = cookieState ? JSON.parse(cookieState) : ''

  return {
    auth: {
      isAuthenticated: false,
      checkedAuthentication: false,
      accessToken: initToken,
      setAccessToken: async (accessToken) => {
        Cookies.set(ACCESS_TOKEN, JSON.stringify(accessToken))
        set((state) => ({
          ...state,
          auth: {
            ...state.auth,
            accessToken: accessToken,
            isAuthenticated: true,
            checkedAuthentication: true,
          },
        }))
      },
      resetAccessToken: () => {
        Cookies.remove(ACCESS_TOKEN)
        set((state) => ({
          ...state,
          auth: {
            ...state.auth,
            accessToken: '',
            isAuthenticated: false,
            checkedAuthentication: true,
          },
        }))
      },
      checkAuthentication: async () => {
        const result = await checkAuth(initToken)

        if (result.success) {
          set((store) => ({
            ...store,
            auth: {
              ...store.auth,
              isAuthenticated: true,
              checkedAuthentication: true,
              accessToken: initToken,
            },
          }))
        } else {
          Cookies.remove(ACCESS_TOKEN)
          set((store) => ({
            ...store,
            auth: {
              ...store.auth,
              isAuthenticated: false,
              checkedAuthentication: true,
              accessToken: '',
            },
          }))
        }
      },
    },
  }
})
