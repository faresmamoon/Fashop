

import { Box, Button, CardMedia, CircularProgress, Container, Link, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import  RegisterImg from './../../assets/register.png'
import  * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import forgotPasswordSchema from '../../validations/ForgotPassword';
import {Link as RouterLink, useNavigate } from 'react-router-dom';
import  LoginImg from './../../assets/login.png'


export default function ForgotPassword() {

  const{register,handleSubmit,formState:{errors}}= useForm({
    resolver:yupResolver(forgotPasswordSchema)
});
const navigate=useNavigate();
  const [isLoading,setIsLoading]=useState(false);
  const onSubmit=async(data)=>{
try{
  setIsLoading(true);
const response= await axios.post(`https://kashop1.runasp.net/api/Identity/Account/forgot-password`,data)
console.log(response);
if(response.status == 200){
navigate('/resetpassword')
}
}catch(error){
console.log("cath error",error);
}finally{
  setIsLoading(false);
}
}
  return (
  <>
<Box sx= {{display:'flex' ,gap:15 }}>
  <Box className="register-img" sx= {{ display: { xs: "none", sm: "none", md: "none", lg: "block" } }}>
    <CardMedia  sx={{height:'100vh' ,width:'100%'  }} component='img' image={LoginImg}>
                </CardMedia>
  </Box>
    <Box className="ForgotPassword-form" sx={{display:'flex'  ,justifyContent:'center',alignItems:'center',flexGrow:1 ,maxWidth: { lg: '600px',  }}}  >
<Container maxWidth="md"  >
  <Typography component="h1" variant='h6'>Step 1</Typography>
    <Typography component="h1" variant='h6'>Forget Password</Typography>

    <Typography component="p" variant='p'sx= {{color:'gray' }}> Please enter your Email and we’ll send you a recovery code.</Typography>

 
<Box 
onSubmit={handleSubmit(onSubmit)}
component={"form"} sx={{display:"flex",
  flexDirection:"column",
  gap:4,
  mt:5}}>

  <label >Email</label>
  <TextField {...register("email")} placeholder="Email"   fullWidth
   error={errors.email}
   helperText={errors.email?.message} 
  ></TextField>

  
   
  
  <Button type='submit' variant="contained" size='large' disabled={isLoading}>
    {isLoading?       <CircularProgress />:"Send Code"}
    </Button>
    

      <Typography display={'flex'} justifyContent={"center"} component={"h3"}>Remembered your password?    <Link  component={RouterLink} to={'/login'}> Login
</Link></Typography>

</Box>
</Container>

    </Box>
    </Box>
    </>
  )
}

