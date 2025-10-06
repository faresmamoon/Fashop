import { Box, Button, CardMedia, CircularProgress, Container, Divider, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import  RegisterImg from './../../assets/register.png'
import  * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import registerSchema from '../../validations/RegisterSchema';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { Visibility, VisibilityOff } from "@mui/icons-material";


export default function Register() {

  const{register,handleSubmit,formState:{errors}}= useForm({
    resolver:yupResolver(registerSchema)
});
const navigate=useNavigate();
  const [isLoading,setIsLoading]=useState(false);
  const [serverError,setServerError]=useState("");
    const [showPassword, setShowPassword] = useState(false);
     const handleTogglePassword = () => setShowPassword((prev) => !prev);
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
 sx= {{display:'flex' ,gap:15 }}>
  <Box className="register-img" sx= {{ display: { xs: "none", sm: "none", md: "none", lg: "block" }  }}>
    <CardMedia  sx={{height:'100vh' ,width:'100%'  }} component='img' image={RegisterImg}>
                </CardMedia>
  </Box>
    <Box className="register-form" sx={{display:'flex' ,justifyContent:'center',alignItems:'center',flexGrow:1 ,maxWidth: { lg: '600px',  }  }}  >
<Container maxWidth="md"   >
  <Typography component="h1" variant='h6'>Create New Account</Typography>
    <Typography component="p" variant='p'sx= {{color:'gray' }}> Join us to track orders, save favorites, and get special offers.</Typography>
<Stack direction={{ md: 'column', lg: 'row' }}  spacing={{  lg: 2, xs: 4 }} py={3}>
      <Button variant="outlined" startIcon={<FacebookIcon />}>
        Facebook
      </Button>
      <Button variant="outlined" startIcon={<GoogleIcon />}>
Google      </Button>
      <Button variant="outlined" startIcon={<AppleIcon />}>
        Apple Id
      </Button>
    </Stack>
   <Divider textAlign='center'>or</Divider>
 
<Box  
onSubmit={handleSubmit(onSubmit)}
component={"form"} sx={{display:"flex",
  flexDirection:"column",
  gap:1,
  mt:3}}>
    <label >Full Name</label>
    {serverError  && (<Typography color='error' > {serverError} </Typography>)}
  <TextField {...register("fullName")}
  placeholder="Full Name" variant='outlined'  fullWidth 
   error={errors.fullName}
   helperText={errors.fullName?.message}
   ></TextField>
   <label >User Name</label>
  <TextField {...register("userName")}  placeholder="User Name"  variant='outlined'  fullWidth 
  error={errors.userName}
   helperText={errors.userName?.message} 
   ></TextField>
      <label >Email</label>
  <TextField {...register("email")}  placeholder="Email" variant='outlined'  fullWidth
   error={errors.email}
   helperText={errors.email?.message} 
  ></TextField>
  <label >Phone Number</label>
  <TextField {...register("phoneNumber")}   placeholder="Phone Number" variant='outlined'  fullWidth
    error={errors.phoneNumber}
   helperText={errors.phoneNumber?.message} 
  ></TextField>
    <label >Password</label>

  <TextField {...register("password")}       type={showPassword ? "text" : "password"}
  placeholder="Password" variant='outlined'  fullWidth 
    error={errors.password}
   helperText={errors.password?.message} 
     InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
  ></TextField>
  <Button type='submit' variant="contained" size='large' disabled={isLoading}>
    {isLoading?       <CircularProgress />:"register"}
    </Button>
 <Typography display={'flex'} justifyContent={"center"} component={"h3"}>Already have an Account?     <Link  component={RouterLink} to={'/login'}> Login
</Link></Typography>
</Box>
</Container>

    </Box>
    </Box>
    </>
  )
}
