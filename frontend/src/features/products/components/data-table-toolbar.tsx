import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '../components/data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().globalFilter.length > 0
  const isSorted = table.getState().sorting.length > 0
  const isHiddenColumns =
    Object.keys(table.getState().columnVisibility).length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Фильтровать...'
          value={(table.getState().globalFilter as string) ?? ''}
          onChange={(event) =>
            table.setGlobalFilter(String(event.target.value))
          }
          className='h-8 w-[200px] lg:w-[250px]'
        />
        {(isFiltered || isSorted || isHiddenColumns) && (
          <Button
            variant='ghost'
            onClick={() => {
              table.setGlobalFilter('')
              table.resetSorting()
              table.resetColumnVisibility()
            }}
            className='h-8 px-2 lg:px-3'
          >
            Сбросить
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
