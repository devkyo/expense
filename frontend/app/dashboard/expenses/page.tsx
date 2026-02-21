
import { columns, Expense } from "./columns";
import { DataTable } from "./data-table";
import { apiEndpoint } from '../../../lib/api';
import { cookies } from "next/headers";


async function getData(): Promise<Expense[]> {

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error('No autenticado');


  const res = await fetch(apiEndpoint(`/expenses`), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "Application/json"
    },
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Error al obtener los gastos')


  return res.json();


}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}