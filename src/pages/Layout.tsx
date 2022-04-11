import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

export const Layout = () => {
  return (
      <>
    <NavBar></NavBar>
    <Outlet></Outlet>
    </>
  )
}
