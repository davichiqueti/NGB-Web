'use client';

import '../styles/globals.css';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import Aside from "../components/navigation/aside/aside.js";
import Footer from "@/components/navigation/mobile/footer/footer.js";
import Header from "@/components/navigation/mobile/header/header.js";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname(); // Obtem a rota atual
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/auth/login', '/auth/signup'];

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (publicRoutes.includes(pathname)) {
      // Permite acesso às rotas públicas sem verificar o token
      setIsAuthenticating(false);
      return;
    }

    if (token) {
      // Usuário autenticado
      setIsAuthenticating(false);
    } else {
      // Redireciona para login se o token não existir
      router.push('/auth/login');
    }
  }, [pathname, router]);

  // Enquanto verifica autenticação, não renderiza nada
  if (isAuthenticating) {
    return null;
  }

  return (
    <html lang="en">
      <body className="bg-gray-800 text-white flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-grow">
          <Aside className="hidden sm-500:block" />
          <main className="flex-grow sm-500:ml-24 sm:ml-32 md:ml-36 md-900:ml-40 lg:ml-64 xl:ml-72 2xl:ml-80 p-4">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
