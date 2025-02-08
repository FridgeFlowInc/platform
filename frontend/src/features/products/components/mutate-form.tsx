import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface MutateFormProps {
  form: any
  formId: string
  onSubmit: () => void
}

export const MutateForm: React.FC<MutateFormProps> = ({
  form,
  formId,
  onSubmit,
}) => {
  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-5'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder='Название' {...field} />
              </FormControl>
              <FormDescription>
                Название продукта (макс. 200 символов).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Категория</FormLabel>
              <FormControl>
                <Input placeholder='Категория' {...field} />
              </FormControl>
              <FormDescription>
                Введите категорию продукта (макс. 200 символов).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='manufacturer'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Производитель</FormLabel>
              <FormControl>
                <Input placeholder='Производитель' {...field} />
              </FormControl>
              <FormDescription>
                Введите производителя (макс. 200 символов).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='quantity'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Количество</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  step='.0001'
                  placeholder='Количество'
                  {...field}
                />
              </FormControl>
              <FormDescription>Введите количество продукта.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='unit'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Единицы измерения</FormLabel>
              <FormControl>
                <Input placeholder='Ед. измерения' {...field} />
              </FormControl>
              <FormDescription>
                Введите единицы измерения (макс. 50 символов).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='nutritional_value'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пищевая ценность [ккал/100г]</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  step='.01'
                  placeholder='Пищевая ценность [ккал/100г]'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Введите пищевую ценность продукта [ккал/100г] (необязательно).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='total_net_weight'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Масса нетто [граммы]</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  step='.01'
                  placeholder='Масса нетто [граммы]'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Введите массу нетто продукта [граммы] (необязательно).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='total_gross_weight'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Масса брутто [граммы]</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  step='.01'
                  placeholder='Масса брутто [граммы]'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Введите массу брутто продукта [граммы] (необязательно).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='manufacture_date'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дата производства</FormLabel>
              <FormControl>
                <Input type='date' {...field} />
              </FormControl>
              <FormDescription>
                Введите дату производства [YYYY-MM-DD].
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='expiration_date'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Срок годности</FormLabel>
              <FormControl>
                <Input type='date' {...field} />
              </FormControl>
              <FormDescription>
                Введите дату истечения срока годности [YYYY-MM-DD].
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='notes'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Заметки</FormLabel>
              <FormControl>
                <Textarea placeholder='Заметки' {...field} />
              </FormControl>
              <FormDescription>
                Введите дополнительные заметки (макс. 1000 символов).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='allergens'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Аллергены</FormLabel>
              <FormControl>
                <Textarea placeholder='Аллергены' {...field} />
              </FormControl>
              <FormDescription>
                Введите информацию об аллергенах (макс. 1000 символов).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
