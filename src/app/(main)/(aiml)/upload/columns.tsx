"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/date";
import { ColumnDef } from "@tanstack/react-table";

export interface UploadedFile {
  id: string;
  file: string;
  description: string | null;
  file_type: string | null;
  user: number;
  uploaded_at: string;
}

export const UploadedFileColumns: ColumnDef<UploadedFile>[] = [
  {
    id: "select-col",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onClick={() => {
            return table.toggleAllRowsSelected(!table.getIsAllRowsSelected());
          }}
        />
      );
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  },
  {
    accessorKey: "id",
    header: "Record ID",
    cell: ({ row }) => {
      const call = row.original as UploadedFile;

      return (
        <Button
          onClick={() => console.log("Clicked user:", call)}
          className="text-blue-600 hover:underline"
          variant={"ghost"}
        >
          {call.id}
        </Button>
      );
    },
  },
  {
    accessorKey: "file",
    header: "File URL",
    cell: ({ row }) => {
      const fileObj = row.original as UploadedFile;

      return (
        <Button
          onClick={() => window.open(fileObj.file, "_blank")}
          className="text-blue-600 hover:underline cursor-pointer"
          variant={"ghost"}
        >
          {fileObj.file}
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "file_type",
    header: "File Type",
  },
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => <div>{formatDate(row.original.uploaded_at)}</div>,
  },
];
