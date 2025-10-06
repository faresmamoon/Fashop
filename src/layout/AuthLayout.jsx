
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'
import { useState } from 'react';



export default function AuthLayout() {
      const [isLoggedIn,setIsLoggedIn]=useState(!!localStorage.getItem("userToken"));
    
  return (
     <>
      
      <Outlet  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  context={{setIsLoggedIn}} />
  
     </>
  )
}
