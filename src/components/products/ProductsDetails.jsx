import { Box, Button, Card, CardContent, CardMedia, Chip, CircularProgress, Rating, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductsDetails() {
    const{id}= useParams();
    
    const [product,setProduct] = useState({});
      const [isLoading,setIsLoading]=useState(true);
const getProduct=async()=>{
  try{
    const response= await axios.get(`https://kashop1.runasp.net/api/Customer/Products/${id}`)
setProduct(response.data);
  }catch(error){
    console.log(error);

  }finally{
setIsLoading(false);
  } }
        const addToCart= async (id)=>{
try{
  const token = localStorage.getItem('userToken');
const response= await axios.post(`https://kashop1.runasp.net/api/Customer/Carts`,
  {productId:id},
{
  headers:{
  Authorization:`Bearer ${token}`
}

});
  console.log(response);
}catch(error){

}finally{

}        }
  useEffect(()=>{
getProduct();
       },[]);
  if(isLoading){
          return(
              <CircularProgress/>
          )
        }


    console.log(id);
  return (
    <Box py={5}>
      <Card sx={{display:'flex',alignItems:'center',boxShadow:5}}>
        <CardMedia sx={{width:400,p:4}} component='img' image={product.mainImageUrl}>
        </CardMedia>
        <CardContent sx={{display:'flex',flexDirection:'column',gap:'20px'}} >
          <Typography component={'h2'} variant='h6'>
            {product.name}
          </Typography>
          <Rating value={product.rate}   />
          <Typography component="p" variant='body1'>
            {product.description}
          </Typography>
          <Typography component="p" variant='body1'>
            price: {product.price}$
          </Typography>
          <Typography component="h6" variant='body1'>
            Category:<Chip label={product.categoryName}/> 
            
          </Typography>
          <Typography component="h6" variant='body1'>
            Brand:<Chip label={product.brandName}/> 
          </Typography>
          <Button variant='contained' color='primary' onClick={()=>addToCart(product.id)}>Add To Cart</Button>
        </CardContent>
      </Card>
    </Box>
  )
}
