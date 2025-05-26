"use client";
import { DataTable } from "@/components/data-table/list-view";
import ModelTrainForm from "@/components/model-train-form";
import { AIModelColumns as columns } from "./columns";

export default function CallTable() {
  return (
    <DataTable
      columns={columns}
      createComponent={<ModelTrainForm />}
      module="models"
      enableSorting
      enablePagination
    />
  );
}
