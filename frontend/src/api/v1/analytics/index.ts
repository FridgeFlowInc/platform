import { axiosWithAuth } from '@/api/v1/wrappers'

export async function analyticsGet() {
  const response = await axiosWithAuth({
    method: 'post',
    url: `/product/analytics`,
  })
  return response.data
}
