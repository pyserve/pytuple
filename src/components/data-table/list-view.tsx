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
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetchRecords } from "@/hooks/fetch-records";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { List } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { PageLayout } from "../page-layout";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  module: string;
  createComponent: React.ReactNode;
  enableSorting?: boolean;
  enablePagination?: boolean;
  enableGlobalFilter?: boolean;
  enableColumnVisibility?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  module,
  createComponent,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  });
  const router = useRouter();
  const pathname = usePathname();
  const { data: data } = useFetchRecords({
    module,
    page: pagination.pageIndex + 1,
    page_size: pagination.pageSize,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnSizing, setcolumnSizing] = React.useState<{
    [key: string]: number;
  }>({});

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const pageCount = useMemo(() => {
    if (data?.count === undefined) return -1;
    return Math.ceil(data?.count / pagination.pageSize);
  }, [data?.count, pagination.pageSize]);

  useEffect(() => {
    router.push(
      `${pathname}?${pagination.pageIndex + 1}&page_size=${pagination.pageSize}`
    );
  }, [pagination.pageIndex, pagination.pageSize]);

  const table = useReactTable({
    data: data?.results ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      pagination,
      sorting,
      columnSizing,
      rowSelection,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnSizingChange: setcolumnSizing,
    onRowSelectionChange: setRowSelection,
    getRowId: (row: TData) => (row as Record<string, string>).id,
    enableSorting: true,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    enableColumnResizing: true,
    manualPagination: true,
    pageCount: pageCount,
  });

  const pageNumbers = useMemo(() => {
    const totalPages = pageCount;
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
  }, [pagination.pageIndex, pageCount]);

  return (
    <PageLayout
      selectedRows={rowSelection}
      setRowSelection={setRowSelection}
      module={module}
      createComponent={createComponent}
      importExport
    >
      <div className="relative flex flex-col">
        <div className="relative h-[79vh] w-full overflow-hidden overflow-x-auto overflow-y-scroll">
          <table className="w-full text-sm">
            <TableHeader className="bg-gray-100 shadow-sm sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="">
                  {headerGroup.headers.map((header, index) => {
                    const disableSorting = index === 0 || index === 1;
                    return (
                      <TableHead
                        key={header.id}
                        className="px-6 py-4 text-xs font-semibold text-gray-900 uppercase relative"
                        onClick={header.column.getToggleSortingHandler()}
                        style={{ width: header.getSize() }}
                      >
                        <div className="flex items-center gap-2">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {!disableSorting && (
                            <span className="cursor-pointer hover:text-gray-900">
                              {header.column.getIsSorted() === "asc" && " 🔼"}
                              {header.column.getIsSorted() === "desc" && " 🔽"}
                              {!["asc", "desc"].includes(
                                header.column.getIsSorted() || ""
                              ) && <List size={14} />}
                            </span>
                          )}
                        </div>
                        {/* <div
                          {...{
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className:
                              "absolute right-0 top-0 h-full w-1.5 cursor-col-resize select-none touch-none bg-transparent hover:bg-gray-300 transition-colors duration-200",
                            style: {
                              transform: "translateX(50%)",
                              zIndex: 10,
                            },
                          }}
                        /> */}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-16">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className={`group hover:bg-gray-50 group-focus-within:bg-gray-50 transition-colors duration-200 ${
                      row.getIsSelected() ? "selected" : ""
                    }`}
                    onClick={row.getToggleSelectedHandler()}
                  >
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
          </table>
        </div>
        <div className="">
          <Pagination className="p-4 bg-gray-50 border-t border-gray-200 flex items-center gap-4 justify-between">
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
                  Selected{" "}
                  <span className="font-medium">
                    {Object.keys(rowSelection)?.length ?? 0}
                  </span>{" "}
                  of <span className="font-medium">{data?.count}</span> row(s)
                </div>
              </div>
            </PaginationContent>
            <PaginationContent className="flex items-center gap-1">
              <div className="flex items-center gap-2">
                <span className="sr-only sm:not-sr-only text-sm text-gray-700">
                  Rows per page:
                </span>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger className="h-8 bg-white border border-gray-300 shadow-sm text-gray-700 hover:border-blue-400">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent className="">
                    {[5, 10, 20, 30, 40, 50, 100].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
    </PageLayout>
  );
}
