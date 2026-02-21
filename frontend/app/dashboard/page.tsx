import { AddItem } from '@/components/dashboard/AddItem';
import Header from '../../components/dashboard/Header';
import ExpensesTable from './expenses/ExpensesTable';

export default function DashboardPage() {
  return (
    <div className='py-4'>


      <ExpensesTable />
      <AddItem />
    </div>
  )
}