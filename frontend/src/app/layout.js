'use client';

import '../styles/globals.css';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkAuth } from '../../services/authService'; // Importa o serviço

import Aside from "../components/navigation/aside/aside.js";
import Footer from "@/components/navigation/mobile/footer/footer.js";
import Header from "@/components/navigation/mobile/header/header.js";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/auth/login', '/auth/signup'];

  useEffect(() => {
    const authenticate = async () => {
      if (publicRoutes.includes(pathname)) {
        setIsAuthenticating(false);
        return;
      }

      const authResult = await checkAuth();
      if (authResult.isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        router.push('/auth/login'); // Redireciona para login
      }

      setIsAuthenticating(false);
    };

    authenticate();
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
