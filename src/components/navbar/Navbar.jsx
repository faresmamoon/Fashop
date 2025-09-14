import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";


export default function Navbar() {
  return (
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{gap:3}}>
          <Link component={RouterLink} to={'/'} color='inherit'underline='none'> Home</Link>
          <Link component={RouterLink} to={'/cart'} color='inherit' underline='none'>Cart</Link>
          <Link component={RouterLink} to={'/login'} color='inherit' underline='none'>Login</Link>
          <Link component={RouterLink} to={'/register'} color='inherit' underline='none'>Register</Link>

        </Toolbar>
      </AppBar>
    </Box>
  )
}
