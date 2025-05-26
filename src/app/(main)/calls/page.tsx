"use client";
import CallForm from "@/components/call-form";
import { DataTable } from "@/components/data-table/list-view";
import { CallColumns as columns } from "./columns";

export default function CallTable() {
  return (
    <DataTable
      columns={columns}
      module="calls"
      createComponent={<CallForm />}
      enableSorting
      enablePagination
    />
  );
}
