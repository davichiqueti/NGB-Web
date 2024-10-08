import './App.css'

import { Outlet } from "react-router-dom"

import Aside from "./components/aside/aside"
import Footer from "./components/footer/footer"
import Header from "./components/header/header"

export default function App() {

  return (
    <>

      <Header />

      <Aside />

      <main>
        <Outlet />
      </main>

      <Footer />

    </>
  )
}
