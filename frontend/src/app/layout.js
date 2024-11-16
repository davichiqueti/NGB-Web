import '../styles/globals.css';

import Aside from "../components/navigation/aside/aside.js"
import Footer from "@/components/navigation/mobile/footer/footer.js";
import Header from "@/components/navigation/mobile/header/header.js";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-gray-800 text-white '>

        <Header className="" />

        <Aside className="hidden sm-500:block" />
        {children}

        <Footer className="" />

      </body>
    </html>
  );
}
