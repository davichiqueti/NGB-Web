import { Outlet } from "react-router-dom"

import Aside from "./components/aside/aside"

export default function App() {

  return (
    <>

      <Aside />

      <Outlet />

    </>
  )
}
