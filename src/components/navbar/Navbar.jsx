import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { IconButton, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext } from 'react';
 import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ThemeContext } from '../../context/ThemeContext';  import LightModeIcon from '@mui/icons-material/LightMode';


export default function Navbar({isLoggedIn,setIsLoggedIn}) {
 const navigate=useNavigate();
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
          <Link component={RouterLink} to={'/'} color='inherit'underline='none'> Home</Link>
          {isLoggedIn ? (<>
          <Link component={RouterLink} to={'/cart'} color='inherit' underline='none'>Cart</Link>
          <Link  component="button"  onClick ={handleLogout} color='inherit' underline='none'>Logout</Link>

          </>): (<>
          <Link component={RouterLink} to={'/login'} color='inherit' underline='none'>Login</Link>
          
          <Link component={RouterLink} to={'/register'} color='inherit' underline='none'>Register</Link>
          </>)}
          <IconButton onClick={togglenTheme}>
            {mode=='light' ? <DarkModeIcon/>:<LightModeIcon/>}
          </IconButton>

        </Toolbar>
      </AppBar>
    </Box>
  )
}
