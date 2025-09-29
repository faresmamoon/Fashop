import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Button, IconButton, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
 import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ThemeContext } from '../../context/ThemeContext';  import LightModeIcon from '@mui/icons-material/LightMode';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';


export default function Navbar({isLoggedIn,setIsLoggedIn}) {
 const navigate=useNavigate();
   const { t} = useTranslation();
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
      <AppBar position="static">
        <Toolbar sx={{gap:3}}>
          <Link component={RouterLink} to={'/'} color='inherit'underline='none'> {t("Home")}</Link>
          {isLoggedIn ? (<>
          <Link component={RouterLink} to={'/cart'} color='inherit' underline='none'>{t("Cart")}</Link>
          <Link  component="button"  onClick ={handleLogout} color='inherit' underline='none'>{t("Logout")}</Link>

          </>): (<>
          <Link component={RouterLink} to={'/login'} color='inherit' underline='none'>{t("Login")}</Link>
          
          <Link component={RouterLink} to={'/register'} color='inherit' underline='none'>{t("Register")}</Link>
          </>)}
          <IconButton onClick={togglenTheme}>
            {mode=='light' ? <DarkModeIcon/>:<LightModeIcon/>}
          </IconButton>
          <Button color='withe' onClick={()=>toggleLanguage(i18next.language =='en'?'ar':'en')} >
            {i18next.language == 'en'?'ar' :'en'}
          </Button>

        </Toolbar>
      </AppBar>
    </Box>
  )
}
