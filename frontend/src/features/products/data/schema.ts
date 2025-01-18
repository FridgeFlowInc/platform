import { z } from 'zod'

export const productSchemaBase = z.object({
  name: z
    .string({ message: 'Обязательное поле' })
    .max(200, 'Не больше 200 символов')
    .min(1, 'Обязательное поле'),
  category: z
    .string({ message: 'Обязательное поле' })
    .max(200, 'Не больше 200 символов')
    .min(1, 'Обязательное поле'),
  manufacturer: z
    .string({ message: 'Обязательное поле' })
    .max(200, 'Не больше 200 символов')
    .min(1, 'Обязательное поле'),
  quantity: z.union([
    z.string({ message: 'Обязательное поле' }).min(1, 'Обязательное поле'),
    z.number({ message: 'Введите число' }),
  ]),
  unit: z
    .string({ message: 'Обязательное поле' })
    .max(50, 'Не больше 200 символов')
    .min(1, 'Обязательное поле'),
  nutritional_value: z.preprocess(
    (val) => (val === '' || val === 0 ? null : val),
    z.union([z.number(), z.string(), z.null()])
  ),
  total_net_weight: z.preprocess(
    (val) => (val === '' || val === 0 ? null : val),
    z.union([z.number(), z.string(), z.null()])
  ),
  total_gross_weight: z.preprocess(
    (val) => (val === '' || val === 0 ? null : val),
    z.union([z.number(), z.string(), z.null()])
  ),
  manufacture_date: z
    .string({ message: 'Обязательное поле' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Невалидная дата'),
  expiration_date: z
    .string({ message: 'Обязательное поле' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Невалидная дата'),
  notes: z.preprocess(
    (val) => (val === '' ? null : val),
    z.union([z.string().max(1000, 'Не больше 1000 символов'), z.null()])
  ),
  allergens: z.preprocess(
    (val) => (val === '' ? null : val),
    z.union([z.string().max(1000, 'Не больше 1000 символов'), z.null()])
  ),
})

export const productSchema = productSchemaBase.extend({
  id: z.string().uuid(),
})

export type Product = z.infer<typeof productSchema>

export const productListSchema = z.array(productSchema)
