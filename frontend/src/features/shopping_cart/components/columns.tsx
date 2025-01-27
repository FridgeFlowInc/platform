import { ColumnDef } from '@tanstack/react-table'
import { shoppingCartProduct } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<shoppingCartProduct>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Продукт' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center space-x-2'>
        <span className='w-full truncate font-medium max-w-[220px] sm:max-w-[500px] md:max-w-[430px] lg:max-w-[600px]'>
          {row.getValue('name')}
        </span>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className='flex justify-end'>
        <DataTableRowActions row={row} />
      </div>
    ),
  },
]
