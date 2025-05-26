"use client";
import { DataTable } from "@/components/data-table/list-view";
import FileUploadForm from "@/components/file-upload-form";
import { UploadedFileColumns as columns } from "./columns";

export default function CallTable() {
  return (
    <DataTable
      columns={columns}
      createComponent={<FileUploadForm />}
      module="uploaded_files"
      enableSorting
      enablePagination
    />
  );
}
