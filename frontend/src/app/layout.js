'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkAuth } from '../../services/authService';
import Header from '@/components/navigation/aside/aside';
import Aside from '@/components/navigation/mobile/header/header';
import Footer from '@/components/navigation/mobile/footer/footer';

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const publicRoutes = ['/login', '/signup'];

  useEffect(() => {
    const validateAuth = async () => {
      if (publicRoutes.includes(pathname)) {
        setIsLoading(false); 
        return;
      }

      try {
        const authResult = await checkAuth();
        if (authResult.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Erro na validação de autenticação:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    validateAuth();
  }, [pathname, router]);

  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    return null;
  }

  return (
    <html lang="en">

      <body className="bg-gray-800 text-white flex flex-col min-h-screen">

        {!publicRoutes.includes(pathname) && <Header />}
        <div className="flex flex-grow">
          {!publicRoutes.includes(pathname) && <Aside className="hidden sm-500:block" />}
          <main className="flex-grow sm-500:ml-24 sm:ml-32 md:ml-36 md-900:ml-40 lg:ml-64 xl:ml-72 2xl:ml-80 p-4">
            {children}
          </main>
        </div>
        {!publicRoutes.includes(pathname) && <Footer />}
      </body>
    </html>
  );
}
