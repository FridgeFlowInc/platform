import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { checkAuth } from '@/api/v1/checkAuth'
import { useAuthStore } from '@/stores/authStore'
import { delay } from '@/lib/delay'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PasswordInput } from '@/components/password-input'

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  password: z.string().min(1, {
    message: 'Введите пароль',
  }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    await delay(500)
    const result = await checkAuth(data.password)
    if (result.success) {
      toast.success('Успешный вход')
      delay(250)
      await useAuthStore.getState().auth.setAccessToken(data.password)
      navigate({ to: '/' })
      setIsLoading(false)
    } else {
      form.setError('password', {
        type: 'manual',
        message: result.message || 'Неверный пароль. Попробуйте снова.',
      })
    }

    setIsLoading(false)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Пароль</FormLabel>
                    <a
                      href='https://t.me/itqdev'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      Забыли пароль?
                    </a>
                  </div>
                  <FormControl>
                    <PasswordInput
                      placeholder='********'
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={isLoading}>
              {isLoading ? <Loader className='animate-spin' /> : 'Войти'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
