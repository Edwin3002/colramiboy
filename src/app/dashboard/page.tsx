"use client";
import DataTable from "@/components/tables/DataTable";
import PencilIcon from "@/components/ui/icons/PencilIcon";
import React from "react";

import { ColumnDef } from "@tanstack/react-table";
import { ThemeToggle } from "@/components/themes/ThemeToggle";

interface Person {
  firstName: string;
  lastName: string;
  email: string;
  startDate: string;
  status: string;
}

// Columnas de la tabla, definidas de forma dinámica
const columns: ColumnDef<Person>[] = [
  // {
  //   accessorKey: 'firstName',
  //   cell: info => info.getValue(),
  // },
  // {
  //   accessorFn: row => row.lastName,
  //   id: 'lastName',
  //   header: () => <span>Last Name</span>,
  //   cell: info => info.getValue(),
  // },
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: "Nombre Completo",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "email",
    header: "Correo",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "startDate",
    header: "Fecha ingreso",
    cell: (info) => info.getValue(),
  },
  // {
  //   accessorKey: 'age',
  //   header: () => 'Age',
  //   meta: {
  //     filterVariant: 'range',
  //   },
  // },
  // {
  //   accessorKey: 'visits',
  //   header: () => <span>Visits</span>,
  //   meta: {
  //     filterVariant: 'range',
  //   },
  // },
  {
    accessorKey: "status",
    header: "Status",
    meta: {
      filterVariant: "select",
    },
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: (info) => {
      return (
        <div className="flex justify-around">
          <PencilIcon size={10} />
        </div>
      );
    },
    meta: {
      filterVariant: "none",
    },
  },
  // {
  //   accessorKey: 'progress',
  //   header: 'Profile Progress',
  //   meta: {
  //     filterVariant: 'range',
  //   },
  // },
];

// Datos de ejemplo
const data = [
  {
    firstName: "1",
    lastName: "Campos flores",
    email: "flores123@gmail.com",
    startDate: "02/02/2024",
    status: "Active",
  },
  {
    firstName: "2",
    lastName: "Campos flores",
    email: "flores123@gmail.com",
    startDate: "02/02/2024",
    status: "Inactive",
  },
  {
    firstName: "3",
    lastName: "Campos flores ",
    email: "flores123@gmail.com",
    startDate: "02/02/2024",
    status: "Pending",
  },
  // { name: 'Apple iMac', category: 'Computers', brand: 'Apple', price: '$1,299', stock: 50, totalSales: 200, status: 'In Stock' },
];

const App = () => {
  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-semibold my-6">Listado de usuarios</h1>
      <DataTable columns={columns} data={data} />
      <PencilIcon size={10} />
      <ThemeToggle />
    </div>
  );
};

export default App;
