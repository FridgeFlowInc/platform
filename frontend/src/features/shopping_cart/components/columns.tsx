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
      <div className='flex w-[100px]'>{row.getValue('name')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className='flex'>
        <DataTableRowActions row={row} />
      </div>
    ),
  },
]
