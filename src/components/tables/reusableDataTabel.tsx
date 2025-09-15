import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { CircleEllipsis } from "lucide-react"
import React, { useMemo, useState } from "react"
import PageToolbar from "../common/PageToolbar"
import { Button } from "../ui/button/Button"

/**
 * Column configuration for the table
 */
interface ColumnConfig {
  field: string
  header: string
  sortable?: boolean
  body?: (rowData: any) => React.ReactNode
}

/**
 * Action item for row actions
 */
interface ActionItem {
  buttonName: string
  displayName: string
  visible: boolean
}

interface ToolbarAction {
  label: string
  onClick: () => void
  icon?: React.ReactNode
  variant?: "default" | "outline" | "ghost"
}

/**
 * Props for the reusable data table
 */
interface ReusableDataTableProps {
  data: any[]
  columns: ColumnConfig[]
  actionItems?: ActionItem[]
  totalRecords: number
  title?: string
  onActionButtonClick?: (buttonName: string, rowData: any) => void
  loading?: boolean
  rowsPerPageOptions?: number[]
  defaultRows?: number
  dataKey?: string
  pageButtons?: () => React.ReactNode
  toolbarActions?: ToolbarAction[]
}

const ReusableDataTable: React.FC<ReusableDataTableProps> = ({
  data,
  columns,
  actionItems,
  totalRecords,
  title,
  onActionButtonClick,
  loading = false,
  rowsPerPageOptions = [5, 10, 25, 50],
  defaultRows = 10,
  dataKey = "id",
  pageButtons,
  toolbarActions,
}) => {
  // Suppress unused parameter warnings
  void totalRecords
  void rowsPerPageOptions
  void dataKey
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])

  const columnDefs = useMemo<ColumnDef<any, any>[]>(() => {
    const baseCols: ColumnDef<any, any>[] = columns.map((col) => ({
      accessorKey: col.field,
      header: col.header,
      enableSorting: !!col.sortable,
      cell: ({ row }) =>
        col.body ? col.body(row.original) : row.original[col.field],
    }))

    if (actionItems && actionItems.length > 0 && onActionButtonClick) {
      baseCols.push({
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex justify-center items-center relative">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Open actions menu"
                >
                  <CircleEllipsis className="w-6 h-6 text-gray-600" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="p-0 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                sideOffset={8}
                align="end"
              >
                <ul className="flex flex-col gap-1 list-none m-0 py-2 px-0 w-full">
                  {actionItems
                    .filter((item) => item.visible)
                    .map((item) => (
                      <li key={item.buttonName}>
                        <button
                          type="button"
                          className="w-full hover:bg-blue-50 text-gray-800 text-sm px-4 py-2 cursor-pointer text-left transition-colors"
                          onClick={() =>
                            onActionButtonClick(item.buttonName, row.original)
                          }
                        >
                          {item.displayName}
                        </button>
                      </li>
                    ))}
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        ),
      })
    }

    return baseCols
  }, [columns, actionItems, onActionButtonClick])

  const table = useReactTable({
    data,
    columns: columnDefs,
    state: {
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: defaultRows,
      },
    },
  })

  if (loading) {
    return (
      <div className="w-full px-1 sm:px-4 py-4 bg-transparent">
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-1 sm:px-4 py-4 bg-transparent">
      <div className="w-full bg-blue flex justify-between items-center mb-4">
        {title && (
          <h1 className="w-full text-2xl font-bold text-blue-900 tracking-tight drop-shadow-sm">
            {title}
          </h1>
        )}
        <PageToolbar actions={toolbarActions || []} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5 mt-2 w-full">
        <div className="flex flex-1 gap-2 items-center">
          <Button variant="outline" onClick={() => setGlobalFilter("")}>
            Clear
          </Button>
          <input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search"
            className="w-full max-w-xs py-2 px-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {pageButtons && <div>{pageButtons()}</div>}
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="border-b border-gray-100 dark:border-white/[0.05]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-5 py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-5 py-4 sm:px-6 text-start text-gray-800 dark:text-gray-200 text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columnDefs.length}
                  className="px-5 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()} ({data.length} records)
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReusableDataTable
