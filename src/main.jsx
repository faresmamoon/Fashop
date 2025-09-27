
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import theme from './them.jsx';


createRoot(document.getElementById('root')).render(
 <>
 <ThemeProvider theme={theme}>
  <CssBaseline/>
  <ToastContainer/>
  <App />
    </ThemeProvider>
  
    
  </>
)
