import '../styles/globals.css';

import Aside from "../components/navigation/aside/aside.js"
import Footer from "@/components/navigation/mobile/footer/footer.js";
import Header from "@/components/navigation/mobile/header/header.js";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />

        <Aside />
        {children}

        <Footer />

      </body>
    </html>
  );
}
