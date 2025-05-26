"use client";
import { DataTable } from "@/components/data-table/list-view";
import LeadForm from "@/components/lead-form";
import { LeadColumns as columns } from "./columns";

export default function CallTable() {
  return (
    <DataTable
      columns={columns}
      module="leads"
      createComponent={<LeadForm />}
      enableSorting
      enablePagination
    />
  );
}
