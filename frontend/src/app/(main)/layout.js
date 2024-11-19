'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkAuth } from '../../../services/authService';
import Header from '@/components/navigation/aside/aside';
import Aside from '@/components/navigation/mobile/header/header';
import Footer from '@/components/navigation/mobile/footer/footer';

export default function MainLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const authResult = await checkAuth();
        if (authResult.isAuthenticated) {
          setIsAuthenticated(true); // Atualiza o estado para autenticado
        } else {
          router.push('/login'); // Redireciona para login se não autenticado
        }
      } catch (error) {
        console.error('Erro na validação de autenticação:', error);
        router.push('/login'); // Redireciona em caso de erro
      } finally {
        setIsLoading(false); // Para o carregamento após a validação
      }
    };

    validateAuth();
  }, [router]);

  if (isLoading) {
    // Exibe um estado de carregamento enquanto verifica a autenticação
    return <div className="flex items-center justify-center min-h-screen text-white">Carregando...</div>;
  }

  if (!isAuthenticated) {
    // Evita exibir conteúdo enquanto redireciona
    return null;
  }

  return (
    <div className="bg-gray-800 text-white flex flex-col min-h-screen">
      {/* Layout principal */}
      <Header />
      <div className="flex flex-grow">
        <Aside className="hidden sm-500:block" />
        <main className="flex-grow sm-500:ml-24 sm:ml-32 md:ml-36 md-900:ml-40 lg:ml-64 xl:ml-72 2xl:ml-80 p-4">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
