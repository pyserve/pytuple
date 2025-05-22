import { DataTable } from "@/components/data-table/list-view";
import { PageLayout } from "@/components/page-layout";
import api from "@/lib/api";
import { CallColumns } from "./columns";

export default async function UserTable() {
  const res = await api.get("/calls/");

  return (
    <PageLayout createRoute="/calls/create/" importExport>
      <DataTable
        columns={CallColumns}
        data={res.data}
        enableSorting
        enablePagination
      />
    </PageLayout>
  );
}
