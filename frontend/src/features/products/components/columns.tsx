import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Product } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Продукт' />
    ),
    cell: ({ row }) => (
      <div className='flex w-[100px]'>{row.getValue('name')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'expiration_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Срок годности' />
    ),
    cell: ({ row }) => {
      const normalStyle =
        'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'

      const expiresSoonStyle =
        'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10'

      const style =
        new Date(row.getValue('expiration_date')) - new Date() > 3 * 86400000
          ? normalStyle
          : expiresSoonStyle

      const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-')
        return `${month}-${day}-${year}`
      }

      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={style}>
            {formatDate(row.getValue('expiration_date'))}
          </Badge>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Категория' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('category')}
          </span>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'manufacturer',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Производитель' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex items-center'>
          <span>{row.getValue('manufacturer')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
