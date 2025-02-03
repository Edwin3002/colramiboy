"use client";
import { DataTable } from "@/components/tables/DataTable";
import { columnsUsers } from "./columnsUsers";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  firstName: string;
};


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
      <DataTable columns={columnsUsers} data={data2} />
    </div>
  );
};

export default App;
