import '../styles/globals.css';

import Aside from "../components/navigation/aside/aside.js";
import Footer from "@/components/navigation/mobile/footer/footer.js";
import Header from "@/components/navigation/mobile/header/header.js";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-800 text-white flex flex-col min-h-screen">
        <Header />

        <div className="flex-grow flex">

          <Aside className="hidden sm-500:block" />
          
          <main className="flex-grow">
            {children}
          </main>
          
        </div>

        <Footer />
      </body>
    </html>
  );
}
