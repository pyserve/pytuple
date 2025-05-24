"use client";
import { DataTable } from "@/components/data-table/list-view";
import { PageLayout } from "@/components/page-layout";
import { useFetchRecords } from "@/hooks/fetch-records";
import { CallColumns } from "./columns";

export default function Page() {
  const { data: calls } = useFetchRecords({
    module: "Call",
  });

  return (
    <PageLayout createComponent={<div></div>} importExport>
      <DataTable
        columns={CallColumns}
        data={calls || []}
        enableSorting
        enablePagination
      />
    </PageLayout>
  );
}
