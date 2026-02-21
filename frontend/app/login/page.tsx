import Login from '@/components/auth/Login';


// La redirección de "ya tengo sesión → dashboard" ahora la maneja
// el middleware.ts automáticamente, por lo que esta página queda limpia.
export default function LoginPage() {

 

  return <Login />;
}
