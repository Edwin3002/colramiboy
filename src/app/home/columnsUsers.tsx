import { Button } from "@/components/ui/shadcn/button";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "./page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";

export const columnsUsers: ColumnDef<Payment>[] = [
  {
    id: "select",
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        // checked={
        //   table.getIsAllPageRowsSelected() ||
        //   (table.getIsSomePageRowsSelected() && "")
        // }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    size: 100,
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
