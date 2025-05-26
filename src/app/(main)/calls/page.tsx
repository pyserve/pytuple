"use client";
import { DataTable } from "@/components/data-table/list-view";
import { CallColumns as columns } from "./columns";

export default function CallTable() {
  return (
    <DataTable
      columns={columns}
      module="calls"
      enableSorting
      enablePagination
    />
  );
}
