import { useQuery } from '@tanstack/react-query'
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from 'recharts'
import { analyticsGet } from '@/api/v1/analytics'
import { delay } from '@/lib/delay'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { ChartContainer, ChartTooltip } from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'

const chartConfig = {
  positive_quantity_change_for_date: {
    label: 'Добавлено',
    color: 'hsl(var(--chart-2))',
  },
  negative_quantity_change_for_date: {
    label: 'Удалено',
    color: 'hsl(var(--destructive))',
  },
}

export default function Analytics() {
  const {
    data: analytics,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const today = new Date()
      const dateBefore = today.toISOString().split('T')[0] // Format as YYYY-MM-DD
      const dateAfter = new Date(today)
      dateAfter.setDate(today.getDate() - 7)

      await delay(250)
      return await analyticsGet(
        dateAfter.toISOString().split('T')[0],
        dateBefore
      )
    },
  })

  const chartData =
    analytics?.map((item) => ({
      date: item.date,
      positive_quantity_change_for_date: item.positive_quantity_change_for_date,
      negative_quantity_change_for_date: item.negative_quantity_change_for_date,
    })) || []

  return (
    <>
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <Card>
          <CardHeader>
            <CardTitle>Аналитика изменений</CardTitle>
            <CardDescription>
              Количество добавлений и удалений за последние 7 дней
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading || isFetching ? (
              <Skeleton className='w-full h-[350px]' />
            ) : error ? (
              <p className='text-destructive'>Ошибка загрузки данных</p>
            ) : (
              <ChartContainer config={chartConfig} className='max-h-[500px]'>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id='colorPositive'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop
                        offset='5%'
                        stopColor='var(--color-positive_quantity_change_for_date)'
                        stopOpacity={0.8}
                      />
                      <stop
                        offset='95%'
                        stopColor='var(--color-positive_quantity_change_for_date)'
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id='colorNegative'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop
                        offset='5%'
                        stopColor='var(--color-negative_quantity_change_for_date)'
                        stopOpacity={0.8}
                      />
                      <stop
                        offset='95%'
                        stopColor='var(--color-negative_quantity_change_for_date)'
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis
                    dataKey='date'
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => {
                      return new Date(value).toLocaleDateString('ru-RU', {
                        weekday: 'short',
                      })
                    }}
                  />
                  <YAxis tickLine={false} axisLine={false} />
                  <Area
                    type='monotone'
                    dataKey='positive_quantity_change_for_date'
                    stroke='var(--color-positive_quantity_change_for_date)'
                    fillOpacity={1}
                    fill='url(#colorPositive)'
                  />
                  <Area
                    type='monotone'
                    dataKey='negative_quantity_change_for_date'
                    stroke='var(--color-negative_quantity_change_for_date)'
                    fillOpacity={1}
                    fill='url(#colorNegative)'
                  />
                  <ChartTooltip content={<CustomTooltip />} />
                </AreaChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </Main>
    </>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-background border border-border p-2 rounded-md shadow-md'>
        <p className='font-semibold'>
          {new Date(label).toLocaleDateString('ru-RU', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <br />
        <p className='text-success'>Добавлено: {payload[0].value}</p>
        <p className='text-destructive dark:text-destructive-dark'>
          Удалено: {payload[1].value}
        </p>
      </div>
    )
  }

  return null
}
