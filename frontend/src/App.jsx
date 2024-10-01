import './App.css'

import { Outlet } from "react-router-dom"

import Aside from "./components/aside/aside"

export default function App() {

  return (
    <>

      <Aside />

      <main>
        <Outlet />
      </main>

    </>
  )
}
