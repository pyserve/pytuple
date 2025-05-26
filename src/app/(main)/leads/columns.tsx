"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/date";
import { ColumnDef } from "@tanstack/react-table";

export type Lead = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export const LeadColumns: ColumnDef<Lead>[] = [
  {
    id: "select-col",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onClick={() =>
          table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
        }
      />
    ),
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
    header: "Record Id",
    cell: ({ row }) => {
      const user = row.original as Lead;

      return (
        <Button
          onClick={() => console.log("Clicked user:", user)}
          className="text-blue-600 hover:underline"
          variant={"ghost"}
        >
          {user.id}
        </Button>
      );
    },
    size: 100,
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const user = row.original as Lead;
      return <span>{formatDate(user.created_at)}</span>;
    },
  },
];
