import { createTheme } from "@mui/material";

const theme =(mode)=> createTheme({
 palette: {
    mode: mode,
  },
});
export default theme