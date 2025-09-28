import { CssBaseline } from "@mui/material";
import {  createContext, useState } from "react";
import theme from "../them";
import { ThemeProvider } from "@emotion/react";

export const ThemeContext=createContext(null);
const ThemeContextProvider=({children})=>{
    const[mode,setMode]=useState("light");
    const currentTheme = theme(mode);
    const togglenTheme=()=>{
       setMode((prev)=>(prev == 'light' ? 'dark': 'light'));

    }
    return <ThemeContext.Provider value={{mode,togglenTheme}}>
         <ThemeProvider theme={currentTheme}>
  <CssBaseline/>
  {children}
  </ThemeProvider>

    </ThemeContext.Provider>
}
export default ThemeContextProvider;
