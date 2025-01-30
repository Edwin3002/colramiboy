"use client";
import DataTable from "@/components/tables/DataTable";
import React from "react";

// Definir el tipo de datos para la tabla

type Product = {
  name: string;
  category: string;
  brand: string;
  price: string;
  stock: number;
  totalSales: number;
  status: string;
};

// Columnas de la tabla, definidas de forma dinámica
const columns = [
  {
    accessorKey: 'firstName',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.lastName,
    id: 'lastName',
    cell: info => info.getValue(),
    header: () => <span>Last Name</span>,
  },
  {
    accessorFn: row => `${row.firstName} ${row.lastName}`,
    id: 'fullName',
    header: 'Full Name',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'age',
    header: () => 'Age',
    meta: {
      filterVariant: 'range',
    },
  },
  {
    accessorKey: 'visits',
    header: () => <span>Visits</span>,
    meta: {
      filterVariant: 'range',
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    meta: {
      filterVariant: 'select',
    },
  },
  {
    accessorKey: 'progress',
    header: 'Profile Progress',
    meta: {
      filterVariant: 'range',
    },
  },
]

// Datos de ejemplo
const data: Product[] = [
  { name: 'Apple iMac', category: 'Computers', brand: 'Apple', price: '$1,299', stock: 50, totalSales: 200, status: 'In Stock' },
  { name: 'Apple iPhone', category: 'Mobile Phones', brand: 'Apple', price: '$999', stock: 120, totalSales: 300, status: 'In Stock' },
  { name: 'Samsung Galaxy', category: 'Mobile Phones', brand: 'Samsung', price: '$899', stock: 80, totalSales: 150, status: 'In Stock' },
  { name: 'Dell XPS 13', category: 'Computers', brand: 'Dell', price: '$1,099', stock: 30, totalSales: 120, status: 'In Stock' },
  { name: 'HP Spectre x360', category: 'Computers', brand: 'HP', price: '$1,299', stock: 25, totalSales: 80, status: 'In Stock' },
  { name: 'Google Pixel 6', category: 'Mobile Phones', brand: 'Google', price: '$799', stock: 100, totalSales: 200, status: 'In Stock' },
];


const App = () => {
  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-semibold my-6">Listado de usuarios</h1>
      {/* <DataTable columns={columns} data={makeData(5_000)} /> */}
    </div>
  );
};

export default App;
