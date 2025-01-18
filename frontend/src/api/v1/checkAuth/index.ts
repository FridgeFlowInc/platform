import { axiosWithoutAuth } from '@/api/v1/wrappers'

export async function checkAuth(token: string) {
  try {
    const response = await axiosWithoutAuth({
      method: 'get',
      url: '/check_auth',
      headers: {
        Authorization: `Bearer ${encodeURIComponent(token)}`,
      },
    })
    return { success: true, status_code: response.status, data: response.data }
  } catch (error) {
    if (error.response) {
      let message: string = ''
      switch (error.response.status) {
        case 401:
          message = 'Неверный пароль'

          return {
            success: false,
            status_code: error.response.status,
            data: error.response.data,
            message: message,
          }
        default:
          message = 'Проблемы на стороне сервера, уже исправляем'

          return {
            success: false,
            status_code: error.response.status,
            data: error.response.data,
            message: message,
          }
      }
    } else if (error.request) {
      return { success: false, message: 'Проблемы с сетью' }
    } else {
      return { success: false, message: error.message }
    }
  }
}
