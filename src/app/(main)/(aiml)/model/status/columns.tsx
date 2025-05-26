"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/date";
import { ColumnDef } from "@tanstack/react-table";

export interface AIModel {
  id: string;
  name: string;
  description: string | null;
  job_id: string;
  status: string;
  api_key: string;
  model_type: string;
  user: number;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

const colors = [
  "bg-purple-600",
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-indigo-500",
];

export const AIModelColumns: ColumnDef<AIModel>[] = [
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
      const call = row.original as AIModel;

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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "job_id",
    header: "Job Id",
  },
  {
    accessorKey: "status",
    header: "Training Status",
    cell: ({ row }) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      return (
        <span
          className={`inline-block ${randomColor} text-white text-xs font-semibold px-2 py-1 rounded-full`}
        >
          {row.original.status}
        </span>
      );
    },
  },
  {
    accessorKey: "api_key",
    header: "Api Key",
  },
  {
    accessorKey: "model_type",
    header: "Model Type",
  },
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "started_at",
    header: "Started At",
    cell: ({ row }) => (
      <div>
        {row.original.started_at && formatDate(row.original.started_at)}
      </div>
    ),
  },
  {
    accessorKey: "completed_at",
    header: "Completed At",
    cell: ({ row }) => (
      <div>
        {row.original.completed_at && formatDate(row.original.completed_at)}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => <div>{formatDate(row.original.created_at)}</div>,
  },
];
