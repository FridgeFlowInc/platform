import { z } from 'zod'

export const shoppingCartProductSchemaBase = z.object({
  name: z
    .string({ message: 'Обязательное поле' })
    .max(200, 'Не больше 200 символов')
    .min(1, 'Обязательное поле'),
  quantity: z.preprocess(
    (val) => (val === '' ? null : val),
    z.union([z.number(), z.string(), z.null()])
  ),
  unit: z.preprocess(
    (val) => (val === '' ? null : val),
    z.union([z.string().max(50), z.null()])
  ),
})

export const shoppingCartProductSchema = shoppingCartProductSchemaBase.extend({
  id: z.string().uuid(),
})

export type shoppingCartProduct = z.infer<typeof shoppingCartProductSchema>

export const shoppingCartProductListSchema = z.array(shoppingCartProductSchema)
