"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/date";
import { ColumnDef } from "@tanstack/react-table";
import { Lead } from "../leads/columns";

export interface Call {
  id: string;
  lead: Lead;
  call_type: string;
  status: "scheduled" | "completed" | "canceled" | string;
  scheduled_time: string | null;
  start_time: string | null;
  end_time: string | null;
  duration_seconds: number | null;
  notes: string | null;
  recording_url: string | null;
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

export const CallColumns: ColumnDef<Call>[] = [
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
      const call = row.original as Call;

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
    accessorKey: "lead.first_name",
    header: "Lead Name",
  },
  {
    accessorKey: "call_type",
    header: "Call Type",
  },
  {
    accessorKey: "status",
    header: "Status",
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
    accessorKey: "scheduled_time",
    header: "Scheduled Time",
    cell: ({ row }) => <div>{formatDate(row.original.scheduled_time)}</div>,
  },
  {
    accessorKey: "start_time",
    header: "Start Time",
    cell: ({ row }) => <div>{formatDate(row.original.start_time)}</div>,
  },
  {
    accessorKey: "end_time",
    header: "End Time",
    cell: ({ row }) => <div>{formatDate(row.original.end_time)}</div>,
  },
  {
    accessorKey: "duration_seconds",
    header: "Duration (s)",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "recording_url",
    header: "Recording",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => <div>{formatDate(row.original.created_at)}</div>,
  },
];
