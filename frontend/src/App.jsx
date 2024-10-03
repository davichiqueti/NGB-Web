import './App.css'

import { Outlet } from "react-router-dom"

import Aside from "./components/aside/aside"
import Footer from "./components/footer/footer"

export default function App() {

  return (
    <>

      <Aside />

      <main>
        <Outlet />
      </main>

      <Footer />

    </>
  )
}
