import { axiosWithAuth } from '@/api/v1/wrappers'

export async function notificationsGet(): Promise<string[]> {
  const response = await axiosWithAuth.get('/product/notifications')
  return response.data
}
