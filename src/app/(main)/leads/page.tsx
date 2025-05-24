"use client";
import { DataTable } from "@/components/data-table/list-view";
import { PageLayout } from "@/components/page-layout";
import { useFetchRecords } from "@/hooks/fetch-records";
import { LeadColumns } from "./columns";

export default function Lead() {
  const { data: leads, isFetched } = useFetchRecords({
    module: "Lead",
  });
  console.log("🚀 ~ Lead ~ leads:", leads);

  if (!isFetched) return "Loading...";

  return (
    <PageLayout createComponent={<div></div>} importExport>
      <DataTable
        columns={LeadColumns}
        data={leads || []}
        enableSorting
        enablePagination
      />
    </PageLayout>
  );
}
