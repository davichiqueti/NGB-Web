'use client';

import '../styles/globals.css';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import Aside from "../components/navigation/aside/aside.js";
import Footer from "@/components/navigation/mobile/footer/footer.js";
import Header from "@/components/navigation/mobile/header/header.js";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname(); // Rota atual
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/auth/login', '/auth/signup'];

  useEffect(() => {
    const checkAuth = async () => {
      if (publicRoutes.includes(pathname)) {
        setIsAuthenticating(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/auth/authcheck', {
          method: 'GET',
          credentials: 'include', // Envia cookies
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true); // Atualiza o estado se o usuário está autenticado
        } else {
          router.push('/auth/login'); // Redireciona para login se não autenticado
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        router.push('/auth/login'); // Redireciona em caso de erro
      } finally {
        setIsAuthenticating(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

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
