import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas que requieren NO estar autenticado (si ya tienes sesión, te manda al dashboard)
const AUTH_ROUTES = ['/login'];

// Rutas que requieren SÍ estar autenticado
const PROTECTED_ROUTES = ['/dashboard'];

/**
 * Decodifica el payload del JWT y verifica si ya venció.
 * No valida la firma (eso lo hace el backend), solo revisa el campo `exp`.
 */
function isTokenExpired(token: string): boolean {
  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return true;

    // atob está disponible en el Edge Runtime de Next.js
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    if (!payload.exp) return true;

    // payload.exp está en segundos, Date.now() en milisegundos
    return Date.now() >= payload.exp * 1000;
  } catch {
    // Si el token está malformado, lo tratamos como vencido
    return true;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith('/login');
  const isProtectedRoute = pathname.startsWith('/dashboard');

  if (isProtectedRoute) {
    // Sin token → redirigir a login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Token vencido → limpiar cookie y redirigir a login
    if (isTokenExpired(token)) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  if (isAuthRoute && token && !isTokenExpired(token)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Solo corre el middleware en estas rutas
  matcher: ['/dashboard/:path*', '/login'],
};
