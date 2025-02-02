"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable2 } from "@/components/tables/DataTable2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/shadcn/button";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/shadcn/checkbox";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  firstName: string;
};

export const columns2: ColumnDef<Payment>[] = [
  {
    id: "select",
    accessorKey: "id",
    header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    meta: {
      filterVariant: "none",
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: {
      filterVariant: "select",
    },
    // cell: ({ row }) => (
    //   <div className="capitalize">{row.getValue("status")}</div>
    // ),
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  {
    accessorKey: "firstName",
    header: "Nombre",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
const data2: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    firstName: "Luz maria",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "failed",
    firstName: "Pedro Alfonso",
    email: "Abe45@gmail.com",
  },
];

const App = () => {
  return (
    <div className="overflow-x-auto mx-8">
      <h1 className="text-2xl font-semibold my-6">Listado de usuarios</h1>
      {/* <DataTable columns={columns} data={data} /> */}
      <DataTable2 columns={columns2} data={data2} />
    </div>
  );
};

export default App;
