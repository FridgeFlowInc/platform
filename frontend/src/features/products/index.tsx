import { useQuery } from '@tanstack/react-query'
import { productList } from '@/api/v1/product/list'
import { delay } from '@/lib/delay'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { ProductsDialogs } from './components/products-dialogs'
import { ProductsPrimaryButtons } from './components/products-primary-buttons'
import { ProductsSkeleton } from './components/skeleton'
import ProductsProvider from './context/products-context'
import { productListSchema } from './data/schema'

export default function Products() {
  const {
    data: products,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      await delay(250)
      const result = await productList()
      return productListSchema.parse(result)
    },
  })

  return (
    <ProductsProvider>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Продукты</h2>
          </div>
          <ProductsPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          {isLoading || isFetching ? (
            <ProductsSkeleton />
          ) : error ? (
            <div>Ошибка: {error.message}</div>
          ) : (
            <DataTable data={products} columns={columns} />
          )}
        </div>
      </Main>

      <ProductsDialogs refetchProducts={refetch} />
    </ProductsProvider>
  )
}