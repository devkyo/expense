"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash } from 'lucide-react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Expense = {
  id: number
  description: string
  amount: string,
  createdAt: Date,
  updatedAt: Date
}

const handleDelete = async (id: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    alert("Error al eliminar");
    return;
  }

  // recargar data
  window.location.reload();
};

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "amount",
    header: "Precio",
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number;
      return `S/ ${amount}`;
    }
  },
  {
    accessorKey: "createdAt",
    header: "Añadido",
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return date.toLocaleString('es-PE');
    }
  },
  {
    accessorKey: "updatedAt",
    header: "Actualizado",
    cell: ({ row }) => {
      const date = new Date(row.getValue('updatedAt'));
      return date.toLocaleString('es-PE');
    }
  },
  {
    id: 'actions',
    header: "Acciones",
    cell: ({ row }) => {
      const expense = row.original;

      return (
        <Button variant="outline" size="icon" aria-label="Submit" className="cursor-pointer text-red-500 hover:underline"
          onClick={() => handleDelete(expense.id)}
        >
          <Trash size={10} />
        </Button>

      )
    }
  }
]