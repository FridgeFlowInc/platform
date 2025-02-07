import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CalendarIcon } from 'lucide-react'
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from 'recharts'
import { analyticsGet } from '@/api/v1/analytics'
import { delay } from '@/lib/delay'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { ChartContainer, ChartTooltip } from '@/components/ui/chart'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { Header } from '@/components/header'
import { Main } from '@/components/layout/main'

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
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() - 7))
  )
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())

  const formatDate = (date: Date | undefined): string => {
    if (!date) return ''

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  const {
    data: analytics,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['analyticsGet', formatDate(startDate), formatDate(endDate)],
    queryFn: async () => {
      await delay(250)
      return await analyticsGet(formatDate(startDate), formatDate(endDate))
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
      <Header />

      <Main>
        <Card>
          <CardHeader>
            <CardTitle>Аналитика изменений</CardTitle>
            <CardDescription>
              Выберите диапазон дат для анализа добавлений и удалений
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-wrap gap-2 mb-4'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className={cn(
                      'w-full sm:w-[240px] justify-start text-left font-normal',
                      !startDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {startDate ? (
                      new Date(startDate).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    ) : (
                      <span>Выберите начальную дату</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className={cn(
                      'w-full sm:w-[240px] justify-start text-left font-normal',
                      !endDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {endDate ? (
                      new Date(endDate).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    ) : (
                      <span>Выберите конечную дату</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            {isLoading || isFetching ? (
              <Skeleton className='w-full h-[350px]' />
            ) : error ? (
              <p className='text-destructive dark:text-destructive-dark'>
                Ошибка загрузки данных
              </p>
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
