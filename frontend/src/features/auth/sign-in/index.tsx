import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import { Card } from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn() {
  const navigate = useNavigate()
  const authStore = useAuthStore.getState().auth

  useEffect(() => {
    if (authStore.checkedAuthentication && authStore.isAuthenticated) {
      navigate({ to: '/' })
    }
  }, [authStore.checkedAuthentication, authStore.isAuthenticated])

  return (
    <AuthLayout>
      <Card className='p-6'>
        <div className='flex flex-col space-y-2 text-left mb-3'>
          <h1 className='text-2xl font-semibold tracking-tight'>Вход</h1>
          <p className='text-sm text-muted-foreground'>
            Введите пароль выданный вашим организатором <br />
          </p>
        </div>
        <UserAuthForm />
      </Card>
    </AuthLayout>
  )
}
