import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Button, Container, IconButton, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
 import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ThemeContext } from '../../context/ThemeContext';  import LightModeIcon from '@mui/icons-material/LightMode';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import { useQuery } from '@tanstack/react-query';


export default function Navbar({isLoggedIn,setIsLoggedIn}) {
 const navigate=useNavigate();
   const { t} = useTranslation();
     const fetchProfile=async()=>{
          const response = await AxiosUserInstanse.get('/Users/profile');
      return response;
     }
     const{data:user}=useQuery({
       queryKey:['User'],
    queryFn:fetchProfile,
    staleTime:1000*60*5
     });
   const fetchProducts=async()=>{
    const response = await AxiosUserInstanse.get('/Customer/Carts');
    return response;
   }
   const {data}=useQuery({
    queryKey:['cartItem'],
    queryFn:fetchProducts,
    staleTime:1000*60*5
   });
   const cartItemCount=(data?.data.items.length);

const toggleLanguage=(newLanguage)=>{
  i18next.changeLanguage(newLanguage).then(()=>{
    setLang(newLanguage);
      document.documentElement.dir = i18next.dir();
  })
  
};
const [lang,setLang]=useState(i18next.language);

 const{mode,togglenTheme}=useContext(ThemeContext);
  const handleLogout=()=>{
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    navigate('/login');
  }
  return (
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" top="0" >
        <Toolbar >
          <Container maxWidth='md'>
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <Box sx={{display:'flex',gap:3}}>

          
          <Link component={RouterLink} to={'/'} color='inherit'underline='none'> {t("Home")}</Link>
          {isLoggedIn ? (<>
          <Link component={RouterLink} to={'/cart'} color='inherit' underline='none'>{t("Cart")}{cartItemCount}</Link>
          <Link  component="button"  onClick ={handleLogout} color='inherit' underline='none'>{t("Logout")}</Link>

          </>): (<>
          <Link component={RouterLink} to={'/login'} color='inherit' underline='none'>{t("Login")}</Link>
          
          <Link component={RouterLink} to={'/register'} color='inherit' underline='none'>{t("Register")}</Link>

          </>)}
          </Box>
          <Box>
          <IconButton onClick={togglenTheme}>
            {mode=='light' ? <DarkModeIcon/>:<LightModeIcon/>}
          </IconButton>
          <Button color='withe' onClick={()=>toggleLanguage(i18next.language =='en'?'ar':'en')} >
            {i18next.language == 'en'?'ar' :'en'}
          </Button>
          <Link  component={RouterLink} to='/profile' color='inherit' underline='none'>{user?.data.fullName}</Link>

          </Box>
          </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
