'use client';

import '../styles/globals.css';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkAuth } from '../../services/authService';

import Aside from "../components/navigation/aside/aside.js";
import Footer from "@/components/navigation/mobile/footer/footer.js";
import Header from "@/components/navigation/mobile/header/header.js";
import PostBtn from "@/components/posts/postBtn/postBtn.js";
import { AuthProvider } from '@/context/AuthContext'; // Importa o AuthProvider

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname(); // Rota atual
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
        router.push('/auth/login');
      }

      setIsAuthenticating(false);
    };

    authenticate();
  }, [pathname, router]);

  const isPublicRoute = publicRoutes.includes(pathname);

  // Se ainda estamos autenticando, mostra um estado de loading
  if (isAuthenticating) {
    return (
      <html lang="en">
        <body className="bg-gray-800 text-white flex flex-col min-h-screen">
          <div>Loading...</div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="bg-gray-800 text-white flex flex-col min-h-screen">
        <AuthProvider> {/* Provider de autenticação envolvendo toda a aplicação */}
          {!isPublicRoute && <Header />}

          <div className="flex flex-grow">
            {!isPublicRoute && <Aside className="hidden sm-500:block" />}

            <main className={`flex-grow ${!isPublicRoute ? 'sm-500:ml-24 sm:ml-32 md:ml-36 md-900:ml-40 lg:ml-64 xl:ml-72 2xl:ml-80 ' : ''}`}>
              <div className={` ${!isPublicRoute ? "max-w-3xl h-screen md-900:border-r md-900:border-slate-400" : "" }`}>
                {children}
              </div>
              {!isPublicRoute && <PostBtn />}
            </main>
          </div>

          {!isPublicRoute && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}
