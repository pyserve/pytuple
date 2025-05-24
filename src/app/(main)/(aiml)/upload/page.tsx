"use client";
import { DataTable } from "@/components/data-table/list-view";
import FileUploadForm from "@/components/file-upload-form";
import { PageLayout } from "@/components/page-layout";

export default function Page() {
  return (
    <PageLayout createComponent={<FileUploadForm />}>
      <DataTable columns={[]} data={[]} enableSorting enablePagination />
    </PageLayout>
  );
}
