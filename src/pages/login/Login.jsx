
import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import  RegisterImg from './../../assets/register.png'
import  * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '../../validations/LoginSchema';
import { Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast, Zoom } from 'react-toastify';

export default function Login() {

  const{register,handleSubmit,formState:{errors}}= useForm({
    resolver:yupResolver(loginSchema)
});
const navigate=useNavigate();

  const [isLoading,setIsLoading]=useState(false);
  
  const onSubmit=async(data)=>{
try{
  setIsLoading(true);
const response= await axios.post(`https://kashop1.runasp.net/api/Identity/Account/Login`,data)
console.log(response);
if(response.status == 200){
  localStorage.setItem("userToken",response.data.token);
navigate('/')
 toast.success('Login succesfully', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Zoom,
})
}
}catch(error){
console.log("cath error",error);
}finally{
  setIsLoading(false);
}
}
  return (
  <>
<Box sx= {{display:'flex' ,gap:4 }}>
  <Box className="register-img" sx= {{ display: { xs: "none", sm: "none", md: "none", lg: "block" },height: '50px'  }}><img src={RegisterImg}  alt="" /></Box>
    <Box className="login-form" sx={{display:'flex'  ,width:'40%' }} py={8} >
<Container maxWidth="lg" bgcolor="red"  >
  <Typography component="h1" variant='h6'>Create New Account</Typography>
    <Typography component="p" variant='p'sx= {{color:'gray' }}> Join us to track orders, save favorites, and get special offers.</Typography>

 
<Box 
onSubmit={handleSubmit(onSubmit)}
component={"form"} sx={{display:"flex",
  flexDirection:"column",
  gap:4,
  mt:5}}>

 
  <TextField {...register("email")} label="Email" variant='outlined'  fullWidth
   error={errors.email}
   helperText={errors.email?.message} 
  ></TextField>

  <TextField {...register("password")} label="Password" variant='outlined'  fullWidth 
    error={errors.password}
   helperText={errors.password?.message} 
  ></TextField>
            <Link component={RouterLink} to={'/forgotpassword'}> Forgot Password
</Link>
  
  <Button type='submit' variant="contained" size='large' disabled={isLoading}>
    {isLoading?       <CircularProgress />:"login"}
    </Button>

</Box>
</Container>

    </Box>
    </Box>
    </>
  )
}
