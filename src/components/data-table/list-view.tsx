"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
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
    pageSize: 50,
  });
  const number = useMemo(() => {
    const start = Math.max(1, pagination.pageIndex - 1);
    const end = Math.min(10, pagination.pageIndex + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [pagination.pageIndex]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
  });

  return (
    <div className="flex flex-col h-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-gray-100 sticky top-0">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="font-medium">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center p-4 bg-gray-100">
        <Pagination className="flex-1 justify-between">
          <PaginationContent>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex gap-2">
                <div>Page</div>
                <strong>
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount().toLocaleString()}
                </strong>
              </div>
              <div className="text-xs">
                Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
                {table.getRowCount().toLocaleString()} row(s)
              </div>
            </div>
          </PaginationContent>
          <PaginationContent>
            <PaginationItem
              className={
                !table.getCanPreviousPage()
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : ""
              }
              onClick={() =>
                setPagination((pag) => ({
                  pageIndex: pag.pageIndex - 1,
                  pageSize: pag.pageSize,
                }))
              }
            >
              <PaginationPrevious href="#" />
            </PaginationItem>
            {number.map((n) => (
              <PaginationItem key={n}>
                <PaginationLink
                  href="#"
                  isActive={n === pagination.pageIndex + 1}
                >
                  {n}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem
              className={
                !table.getCanNextPage()
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : ""
              }
              onClick={() =>
                setPagination((pag) => ({
                  pageIndex: pag.pageIndex + 1,
                  pageSize: pag.pageSize,
                }))
              }
            >
              <PaginationNext href={"#"} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
