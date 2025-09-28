
import { createRoot } from 'react-dom/client'
import "./index.css"; 
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import theme from './them.jsx';
import ThemeContextProvider from './context/ThemeContext.jsx';


createRoot(document.getElementById('root')).render(
 <>
 <ThemeContextProvider>
  <ToastContainer/>
  <App />
    </ThemeContextProvider>
  
    
  </>
)
