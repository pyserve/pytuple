"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { List } from "lucide-react";
import React, { useMemo } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enableSorting?: boolean;
  enablePagination?: boolean;
  enableGlobalFilter?: boolean;
  enableColumnVisibility?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableSorting: true,
  });

  const pageNumbers = useMemo(() => {
    const totalPages = table.getPageCount();
    const currentPage = pagination.pageIndex;
    const maxPageNumbers = 3;
    let startPage = Math.max(0, currentPage - Math.floor(maxPageNumbers / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxPageNumbers - 1);
    if (endPage - startPage + 1 < maxPageNumbers) {
      startPage = Math.max(0, endPage - maxPageNumbers + 1);
    }
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [pagination.pageIndex, table.getPageCount()]);

  return (
    <div className="flex flex-col min-h-0">
      <div className="flex-1 overflow-auto max-h-[79vh]">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="shadow-sm bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase "
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <span className="cursor-pointer hover:text-gray-900">
                        {header.column.getIsSorted() === "asc" && " 🔼"}
                        {header.column.getIsSorted() === "desc" && " 🔽"}
                        {!["asc", "desc"].includes(
                          header.column.getIsSorted() || ""
                        ) && <List size={14} />}
                      </span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 ">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="bg-white hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
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
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No data to display.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="sticky inset-0 bottom-0 bg-white">
        <Pagination className="p-4 bg-gray-50 border-t border-gray-200 flex items-center gap-4">
          <PaginationContent className="">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span>Page</span>
                <strong className="font-medium text-gray-800">
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount().toLocaleString()}
                </strong>
              </div>
              <div className="text-xs hidden sm:block">
                Showing{" "}
                <span className="font-medium">
                  {table.getRowModel().rows.length.toLocaleString()}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {table.getRowCount().toLocaleString()}
                </span>{" "}
                row(s)
              </div>
              <div className="flex items-center gap-2">
                <span className="sr-only sm:not-sr-only">Rows per page:</span>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px] bg-white border border-gray-300 shadow-sm text-gray-700 hover:border-blue-400">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-lg border border-gray-200">
                    {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PaginationContent>
          <PaginationContent className="flex items-center gap-1">
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={() => table.setPageIndex(0)}
                className={`flex items-center justify-center h-8 w-8 rounded-md bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 ${
                  !table.getCanPreviousPage()
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : ""
                }`}
              >
                {"<<"}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={() => table.previousPage()}
                className={`flex items-center justify-center h-8 w-8 rounded-md bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 ${
                  !table.getCanPreviousPage()
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : ""
                }`}
              >
                {"<"}
              </PaginationLink>
            </PaginationItem>
            {pageNumbers.map((pageIndex) => (
              <PaginationItem key={pageIndex}>
                <PaginationLink
                  href="#"
                  isActive={pageIndex === pagination.pageIndex}
                  onClick={() => table.setPageIndex(pageIndex)}
                  className={`flex items-center justify-center h-8 w-8 rounded-md transition-colors duration-200 ease-in-out ${
                    pageIndex === pagination.pageIndex
                      ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pageIndex + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={() => table.nextPage()}
                className={`flex items-center justify-center h-8 w-8 rounded-md bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 ${
                  !table.getCanNextPage()
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : ""
                }`}
              >
                {">"}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                className={`flex items-center justify-center h-8 w-8 rounded-md bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 ${
                  !table.getCanNextPage()
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : ""
                }`}
              >
                {">>"}
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
