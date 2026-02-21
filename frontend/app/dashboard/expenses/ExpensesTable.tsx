import { columns, Expense } from "./columns";
import { DataTable } from "./data-table";
import { apiEndpoint } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

async function getData(): Promise<Expense[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect('login');

  const res = await fetch(apiEndpoint("/expenses"), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (res.status === 401) redirect('login');

  if (!res.ok) throw new Error("Error al obtener los gastos");

  return res.json();
}

export default async function ExpensesTable() {
  const data = await getData();

  return <DataTable columns={columns} data={data} />
}