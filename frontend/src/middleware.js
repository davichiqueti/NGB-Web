import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('jwt');

  const publicRoutes = ['/login', '/signup'];

  if (publicRoutes.includes(req.nextUrl.pathname)) {
    // Permite acesso a rotas públicas
    return NextResponse.next();
  }

  if (!token) {
    // Redireciona para login se o token estiver ausente
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Permite acesso às rotas privadas
  return NextResponse.next();
}

// Configurar o middleware para aplicar a todas as rotas
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // Aplica a todas as rotas, exceto estáticas
};
