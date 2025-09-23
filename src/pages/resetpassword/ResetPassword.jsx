

import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import  RegisterImg from './../../assets/register.png'
import  * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import resetPasswordSchema from '../../validations/ResetPassword';
import { useNavigate } from 'react-router-dom';


export default function ResetPassword() {

  const{register,handleSubmit,formState:{errors}}= useForm({
    resolver:yupResolver(resetPasswordSchema)
});
const navigate=useNavigate();
  const [isLoading,setIsLoading]=useState(false);
  const onSubmit=async(data)=>{
try{
  setIsLoading(true);
const response= await axios.patch(`https://kashop1.runasp.net/api/Identity/Account/reset-password`,data)
console.log(response);
if(response.status == 200){
navigate('/login')
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
    <Box className="ResetPassword-form" sx={{display:'flex'  ,width:'40%' }} py={8} >
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
<TextField {...register("newPassword")} label="New Password" variant='outlined'  fullWidth
   error={errors.newPassword}
   helperText={errors.newPassword?.message} 
  ></TextField>
  <TextField {...register("code")} label="Code" variant='outlined'  fullWidth
   error={errors.code}
   helperText={errors.code?.message} 
  ></TextField>
  
   
  
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

