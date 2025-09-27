import React, { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

export default function MainLayout() {
  const [isLoggedIn,setIsLoggedIn]=useState(!!localStorage.getItem("userToken"));

  return (
    <>
    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    <Container maxWidth='md'>  
      <Outlet context={{setIsLoggedIn}}/>
    </Container>
  
    <Footer/>
    </>
  )
}
