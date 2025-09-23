import { Box, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Products() {
    const [products,setProducts]=useState([]);
      const [isLoading,setIsLoading]=useState(true);
      
      const getProducts=async()=>{
        try{
        const response=await axios.get(`https://kashop1.runasp.net/api/Customer/Products`);
        console.log(response);
        setProducts(response.data)
        }catch(error){
    console.log(error);
        }finally{
            setIsLoading(false);
        }
    
      }
      useEffect(()=>{
        getProducts();
      },[]);
      if(isLoading){
        return(
            <CircularProgress/>
        )
      }
  return (
   <Box py={5}  >
<Typography variant="h3" component="h2">
Products
</Typography>
<Grid container spacing={3}>
   {products.map((product)=>(
    <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}  >
        <Link to={`/product/${product.id}`}   style={{ textDecoration: "none" }} >
        <Card  sx={{boxShadow:5,borderRadius:3}}>
            <CardMedia alt={product.name} height="160" sx={{p:2,objectFit:"contain"}} component='img' image={product.mainImageUrl}>
            </CardMedia>
            <CardContent>
                <Typography align="center" variant="h4">{product.name}</Typography>
                <Typography align="center" variant="h4">{product.price}$</Typography>

            </CardContent>
            
        </Card>
        </Link>
    </Grid>
   ))}
</Grid>
   </Box>
  )
}
