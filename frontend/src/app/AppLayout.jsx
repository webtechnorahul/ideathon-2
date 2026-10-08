import React from 'react'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Nav from '../shared/components/Nav'

const AppLayout = () => {
  return (
    <div>
        <Nav />
        <Outlet />
        <ToastContainer />
    </div>
  )
}

export default AppLayout