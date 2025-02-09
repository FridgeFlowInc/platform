import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { AxiosError } from 'axios'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/authStore'
import { handleServerError } from '@/utils/handle-server-error'
import { ThemeProvider } from './context/theme-context'
import './index.css'
import { routeTree } from './routeTree.gen'
import './styles/fonts.css'
import './styles/globals.css'
import './styles/toasts.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (import.meta.env.DEV) {
          console.log({ failureCount, error })
        }

        if (failureCount >= 3) return false

        return !(
          error instanceof AxiosError &&
          error.response?.status >= 400 &&
          error.response?.status < 500
        )
      },
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: 10 * 1000, // 10 seconds
    },
    mutations: {
      onError: (error) => {
        if (error instanceof AxiosError) {
          const status = error.response?.status
          switch (status) {
            case 401:
              toast.warning('Войдите в аккаунт')
              useAuthStore.getState().auth.resetAccessToken()
              location.reload()
              break
            case 404:
              toast.warning('Элемент не найден')
              break
            case 422:
              toast.warning('Невалидные данные')
              break
            case 500:
              toast.error('Ошибка сервера')
              break
            default:
              toast.error('Произошла ошибка')
              break
          }
        } else {
          toast.error('Непредвиденная ошибка')
        }

        handleServerError(error)
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status
        switch (status) {
          case 401:
            toast.warning('Войдите в аккаунт')
            useAuthStore.getState().auth.resetAccessToken()
            router.navigate({ to: '/sign-in' })
            break
          case 404:
            toast.warning('Элемент не найден')
            break
          case 422:
            toast.warning('Невалидные данные')
            break
          case 500:
            toast.error('Ошибка сервера')
            break
          default:
            toast.error('Произошла ошибка')
            break
        }
      } else {
        toast.error('Непредвиденная ошибка')
      }
    },
  }),
})

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme='light' storageKey='fridgeflow-ui-theme'>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}
