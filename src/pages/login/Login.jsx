
import { Box, Button, CardMedia, CircularProgress, Container, Divider, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import  LoginImg from './../../assets/login.png'
import  * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '../../validations/LoginSchema';
import { Link } from '@mui/material';
import { Link as RouterLink, useNavigate, useOutletContext } from "react-router-dom";
import { toast, Zoom } from 'react-toastify';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {

  const{register,handleSubmit,formState:{errors}}= useForm({
    resolver:yupResolver(loginSchema)
});
const {setIsLoggedIn}=useOutletContext();
const navigate=useNavigate();

  const [isLoading,setIsLoading]=useState(false);
      const [showPassword, setShowPassword] = useState(false);
       const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const onSubmit=async(data)=>{
try{
  setIsLoading(true);
const response= await axios.post(`https://kashop1.runasp.net/api/Identity/Account/Login`,data)
console.log(response);
if(response.status == 200){
  localStorage.setItem("userToken",response.data.token);
navigate('/');
setIsLoggedIn(true);
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
<Box sx= {{display:'flex',gap:15, }}>
  <Box className="login-img" sx= {{ display: { xs: "none", sm: "none", md: "none", lg: "block" }  }}>
       <CardMedia  sx={{height:'100vh' ,width:'100%'  }} component='img' image={LoginImg}>
                </CardMedia>
    </Box>
    <Box className="login-form" sx={{display:'flex',justifyContent:'center',alignItems:'center',flexGrow:1,maxWidth: { lg: '600px',  }
       }}  >
<Container maxWidth="md"    >
  <Typography component="h1" variant='h6'>Login</Typography>
    <Typography component="p" variant='p'sx= {{color:'gray' }}> Good to see you again!</Typography>

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
  gap:2,
  mt:3}}>

 <label >Email</label>
  <TextField {...register("email")} placeholder="email@example.com"  fullWidth
   error={errors.email}
   helperText={errors.email?.message} 
  ></TextField>
<label >Password</label>
  <TextField {...register("password")} type={showPassword ? "text" : "password"} placeholder="Password" variant='outlined'  fullWidth 
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
            <Link display={'flex'} justifyContent={"flex-end"} component={RouterLink} to={'/forgotpassword'}> Forgot Password
</Link>
  
  <Button type='submit' variant="contained" size='large' disabled={isLoading}>
    {isLoading?       <CircularProgress />:"login"}
    </Button>
    <Typography display={'flex'} justifyContent={"center"} component={"h3"}>Don’t Have an Account?      <Link  component={RouterLink} to={'/register'}> Create Account
</Link></Typography>
 

</Box>
</Container>

    </Box>
    </Box>
    </>
  )
}
