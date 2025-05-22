"use client";

import { Button } from "@/components/ui/button";
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
    accessorKey: "id",
    header: "#",
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
  // {
  //   accessorKey: "action",
  //   header: "Action",
  //   cell: ({ row }) => {
  //     const user = row.original as Lead;
  //     return (
  //       <Button>
  //         <Phone /> Call
  //       </Button>
  //     );
  //   },
  // },
];
