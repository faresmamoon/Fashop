import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import  RegisterImg from './../../assets/register.png'
import  * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import registerSchema from '../../validations/RegisterSchema';
import { useNavigate } from 'react-router-dom';


export default function Register() {

  const{register,handleSubmit,formState:{errors}}= useForm({
    resolver:yupResolver(registerSchema)
});
const navigate=useNavigate();
  const [isLoading,setIsLoading]=useState(false);
  const [serverError,setServerError]=useState("")
  const onSubmit=async(data)=>{
try{
  setIsLoading(true);
const response= await axios.post(`https://kashop1.runasp.net/api/Identity/Account/Register`,data)
console.log(response);
if(response.status==200){
navigate('/login')
}
}catch(error){
if(error.response){
  setServerError(error.response.data.message);
}
else{
  setServerError("An unexptected error...");
}
}finally{
  setIsLoading(false);
}
}
  return (
  <>
<Box
 sx= {{display:'flex' ,gap:4 }}>
  <Box className="register-img" sx= {{ display: { xs: "none", sm: "none", md: "none", lg: "block" },height: '50px'  }}><img src={RegisterImg}  alt="" /></Box>
    <Box className="register-form" sx={{display:'flex'  ,width:'40%' }} py={8} >
<Container maxWidth="lg" bgcolor="red"  >
  <Typography component="h1" variant='h6'>Create New Account</Typography>
    <Typography component="p" variant='p'sx= {{color:'gray' }}> Join us to track orders, save favorites, and get special offers.</Typography>

 
<Box  
onSubmit={handleSubmit(onSubmit)}
component={"form"} sx={{display:"flex",
  flexDirection:"column",
  gap:4,
  mt:5}}>
    {serverError  && (<Typography color='error' > {serverError} </Typography>)}
  <TextField {...register("fullName")}
   label="fullName" variant='outlined'  fullWidth 
   error={errors.fullName}
   helperText={errors.fullName?.message}
   ></TextField>
  <TextField {...register("userName")} label="UserName" variant='outlined'  fullWidth 
  error={errors.userName}
   helperText={errors.userName?.message} 
   ></TextField>
  <TextField {...register("email")} label="Email" variant='outlined'  fullWidth
   error={errors.email}
   helperText={errors.email?.message} 
  ></TextField>
  <TextField {...register("phoneNumber")} label="PhoneNumber" variant='outlined'  fullWidth
    error={errors.phoneNumber}
   helperText={errors.phoneNumber?.message} 
  ></TextField>
  <TextField {...register("password")} label="Password" variant='outlined'  fullWidth 
    error={errors.password}
   helperText={errors.password?.message} 
  ></TextField>
  <Button type='submit' variant="contained" size='large' disabled={isLoading}>
    {isLoading?       <CircularProgress />:"register"}
    </Button>

</Box>
</Container>

    </Box>
    </Box>
    </>
  )
}
