import { useQuery } from '@tanstack/react-query'
import { shoppingCartProductList } from '@/api/v1/shopping_cart/list'
import { delay } from '@/lib/delay'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { ProductsDialogs } from './components/shopping-cart-products-dialogs'
import { ShoppingCartProductsPrimaryButtons } from './components/shopping-cart-products-primary-buttons'
import { ShoppingCartProductsSkeleton } from './components/skeleton'
import ProductsProvider from './context/products-context'
import { shoppingCartProductListSchema } from './data/schema'

export default function ShoppingCardProducts() {
  const {
    data: shoppingCartProducts,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ['shoppingCartProductsGet'],
    queryFn: async () => {
      await delay(250)
      const result = await shoppingCartProductList()
      return shoppingCartProductListSchema.parse(result)
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
            <h2 className='text-2xl font-bold tracking-tight mt-[6px]'>
              Корзина
            </h2>
          </div>
          <ShoppingCartProductsPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          {isLoading || isFetching ? (
            <ShoppingCartProductsSkeleton />
          ) : error ? (
            <div>Ошибка: {error.message}</div>
          ) : (
            <>
              <DataTable data={shoppingCartProducts} columns={columns} />
            </>
          )}
        </div>
      </Main>

      <ProductsDialogs refetchShoppingCartProducts={refetch} />
    </ProductsProvider>
  )
}
