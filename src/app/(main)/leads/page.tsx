import { DataTable } from "@/components/data-table/list-view";
import api from "@/lib/api";
import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: number;
  name: string;
  email: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "display_name",
    header: "Display Name",
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
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
];

export default async function UserTable() {
  const res = await api.get("/leads/");

  return (
    <DataTable
      columns={columns}
      data={res.data?.results}
      enableSorting
      enablePagination
    />
  );
}
