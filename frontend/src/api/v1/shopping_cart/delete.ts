import { axiosWithAuth } from '@/api/v1/wrappers'

export async function shoppingCartProductDelete(shoppingCartProductId: string) {
  const response = await axiosWithAuth({
    method: 'delete',
    url: `/shopping_cart/${shoppingCartProductId}`,
  })
  return response.data
}
