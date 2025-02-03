import { axiosWithAuth } from '@/api/v1/wrappers'

export async function manufacturersList(): Promise<string[]> {
  const response = await axiosWithAuth.get('/product/manufacturers')
  return response.data
}
