"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  isLoading?: boolean;
  onRowClick?: (row: TData) => void;
  rowClickable?: boolean;
  getRowId?: (row: TData) => string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
  isLoading = false,
  onRowClick,
  rowClickable = false,
  getRowId,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: getRowId,
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  });

  // Skeleton loading rows
  const skeletonRows = Array.from({ length: pageSize }, (_, index) => index);

  const handleRowClick = (row: TData, event: React.MouseEvent) => {
    console.log("🔍 Row click detected:", {
      rowClickable,
      onRowClick: !!onRowClick,
      row,
    });

    // Optional: Only prevent clicks on form inputs and buttons
    const target = event.target as HTMLElement;
    if (
      target.closest("input") ||
      target.closest("select") ||
      target.closest("textarea")
    ) {
      console.log("🚫 Click ignored - form element");
      return;
    }

    if (onRowClick && rowClickable) {
      console.log("✅ Executing row click callback");
      onRowClick(row);
    } else {
      console.log("❌ Row click not executed:", {
        hasCallback: !!onRowClick,
        isClickable: rowClickable,
      });
    }
  };

  // Debug: Log props
  // console.log("📊 DataTable Props:", {
  //   rowClickable,
  //   hasOnRowClick: !!onRowClick,
  //   dataLength: data.length,
  // });

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading skeleton
              skeletonRows.map((rowIndex) => (
                <TableRow key={`skeleton-${rowIndex}`}>
                  {table.getAllColumns().map((column, cellIndex) => (
                    <TableCell key={`skeleton-cell-${rowIndex}-${cellIndex}`}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              // Actual data rows
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={(event) => handleRowClick(row.original, event)}
                  className={`
                    ${
                      rowClickable
                        ? "transition-colors duration-300 hover:font-medium cursor-pointer hover:bg-muted/50 "
                        : ""
                    }
                    ${rowClickable ? "select-none" : ""}
                  `}
                  role={rowClickable ? "button" : undefined}
                  tabIndex={rowClickable ? 0 : undefined}
                  onKeyDown={
                    rowClickable
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            console.log("⌨️ Keyboard interaction");
                            handleRowClick(row.original, e as any);
                          }
                        }
                      : undefined
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      // REMOVED the onClick handler that was preventing bubbling
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // No results
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Debug Info - ENABLED for debugging */}
      {/* <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
        <strong>Debug:</strong> rowClickable={String(rowClickable)},
        hasCallback={String(!!onRowClick)}, rows=
        {table.getRowModel().rows?.length || 0}
      </div> */}

      {/* Pagination Controls */}
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()} • Total de {data.length} registros
        </div>

        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || isLoading}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage() || isLoading}
          >
            Próximo
          </Button>
        </div>
      </div>

      {/* Page Size Selector */}
      <div className="flex items-center space-x-2 py-2">
        <span className="text-sm text-muted-foreground">Itens por página:</span>
        <select
          className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          disabled={isLoading}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
