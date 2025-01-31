"use client";
import { useEffect, useMemo, useState } from "react";

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import FieldInput from "../ui/inputs/FieldInput";
import SelectInput from "../ui/inputs/SelectInput";
import Button from "../ui/buttons/Button";

interface TableProps<TData> {
  columns: ColumnDef<TData>[]; // Definimos las columnas con el tipo genérico TData
  data: TData[]; // Hacemos que data sea un array de TData (puede ser cualquier tipo)
}

function DataTable<TData>({ columns, data }: TableProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      exact: (row, columnId, filterValue) => {
        const cellValue = row.getValue(columnId);
        console.log(cellValue);

        return cellValue === filterValue;
      },
    },
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <div className="p-2">
      <div className="flex justify-end my-1">
        <Button
          onClick={() => setColumnFilters([])}
          variant="contained"
          color="red"
          className={columnFilters.length === 0 ? "invisible" : "block"}
        >
          Quitar filtros
        </Button>
      </div>
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`w-1/${headerGroup.headers.length}`}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div className="m-4">
                            <Filter
                              column={header.column}
                              optionsSelect={table.options.data}
                            />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-end items-center gap-2 mt-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
    </div>
  );
}
interface ColumnMeta {
  filterVariant?: "select" | "range" | "none" | "";
}

function Filter<TData>({
  column,
  optionsSelect = [],
}: {
  column: Column<unknown, unknown>;
  optionsSelect: TData[];
}) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant = "" }: ColumnMeta = column?.columnDef?.meta ?? {};

  const options = useMemo(() => {
    const options = new Set();
    if (filterVariant === "select")
      optionsSelect.forEach((row) => options.add(row?.[column.id]));

    return [...options.values()];
  }, [column.id, optionsSelect, filterVariant]);

  return filterVariant === "none" ? (
    <DebouncedInput
      value=""
      onChange={() => {}}
      disabled
      visibility="invisible"
    />
  ) : filterVariant === "range" ? (
    <div>
      <div className="flex space-x-2 justify-around">
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder="Min"
        />
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder="Max"
        />
      </div>
    </div>
  ) : filterVariant === "select" ? (
    <SelectInput
      options={options as []}
      placeholder="Todos"
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString() || ""}
    />
  ) : (
    <DebouncedInput
      onChange={(value) => column.setFilterValue(value)}
      value={(columnFilterValue ?? "") as string}
    />
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  type?: "text" | "email" | "password" | "number";
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
  placeholder?: string;
  disabled?: boolean;
  visibility?: "block" | "invisible";
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <FieldInput
      {...props}
      placeholder="Buscar por"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default DataTable;
