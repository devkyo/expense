import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiEndpoint } from "@/lib/api";
import Header from "@/components/dashboard/Header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;


  if (token) {
    try {
      const res = await fetch(apiEndpoint('/profile'), {
        method: 'GET',
        headers: { Cookie: `token=${token}` },
        cache: 'no-store',
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));

        if (errorData.message === "Token expirado") {
          redirect('/login');
        } else {
          redirect('/login');
        }
      }

      const data = await res.json();
      const user = data.user;


      return (
        <div className="container mx-4 md:mx-6 lg:mx-auto">
          <Header user={user} />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />


              <BreadcrumbItem>
                <BreadcrumbPage>Expenses</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="dashboard-layout">
            <div className="container mx-auto">
              {children}
            </div>
          </div>
        </div>
      )

    } catch {
      redirect('/login');
    }
  }

  // Si no hay token (o ya fue limpiado por el middleware), redirigir a login
  redirect('/login');
}