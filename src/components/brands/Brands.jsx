import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"

export default function Brands() {
    const [brands,setBrands]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  
  const getBrands=async()=>{
    try{
    const response=await axios.get(`https://kashop1.runasp.net/api/Customer/Brands`);
    console.log(response);
    setBrands(response.data)
    }catch(error){
console.log(error);
    }finally{
        setIsLoading(false);
    }

  }
  useEffect(()=>{
    getBrands();
  },[]);
  if(isLoading){
    return(
        <CircularProgress/>
    )
  }

  return (
   <Box py={5}  >
<Typography variant="h3" component="h2">
our brands
</Typography>
<Grid container spacing={3}>
   {brands.map((brand)=>(
    <Grid key={brand.id} item xs={12} sm={6} md={4} lg={3}  >
        <Card  sx={{boxShadow:5,borderRadius:3}}>
            <CardMedia alt={brand.name} height="160" sx={{p:2}} component='img' image={brand.mainImageUrl}>
            </CardMedia>
            <CardContent>
                <Typography align="center" variant="h6">{brand.name}</Typography>
            </CardContent>
        </Card>
    </Grid>
   ))}
</Grid>
   </Box>
  )
}
