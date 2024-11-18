import '../styles/globals.css';

import Aside from "../components/navigation/aside/aside.js";
import Footer from "@/components/navigation/mobile/footer/footer.js";
import Header from "@/components/navigation/mobile/header/header.js";
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    router.push('/login');
    return null; // Evita renderizar conteúdo até que o redirecionamento ocorra
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
