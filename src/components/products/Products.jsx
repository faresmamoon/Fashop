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
        <Card  sx={{boxShadow:5,borderRadius:3,maxWidth:300}}>
            <CardMedia alt={product.name}  sx={{p:2,objectFit:"contain"}} component='img' image={product.mainImageUrl}>
            </CardMedia>
            <CardContent>
                <Typography align="center" variant="h5">{product.name.split(' ').slice(0,4).join(' ')}</Typography>
                <Typography align="center" variant="h6" color='text.secondary'>{product.price}$</Typography>

            </CardContent>
            
        </Card>
        </Link>
    </Grid>
   ))}
</Grid>
   </Box>
  )
}
