import { axiosWithAuth } from '@/api/v1/wrappers'

export async function analyticsGet(date_after: string, date_before: string) {
  const response = await axiosWithAuth({
    method: 'get',
    url: `/product/analytics?date_after=${date_after}&date_before=${date_before}`,
  })
  return response.data
}
