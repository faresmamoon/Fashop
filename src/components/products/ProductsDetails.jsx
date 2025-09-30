import { Box, Button, Card, CardContent, CardMedia, Chip, CircularProgress, Rating, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import { toast, Zoom } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AxiosInstanse from '../../api/AxiosInstanse';

export default function ProductsDetails() { 
  const queryClient=useQueryClient();
    const{id}= useParams();
  const fetchProductDetails= async()=>{
          const response=await AxiosInstanse.get(`/Customer/Products/${id}`);
return response;
    }
    const{data,isLoading,isError,error}=useQuery({
      queryKey:['Products',id],
      queryFn:fetchProductDetails,
      staleTime:1000 * 60 * 5
    })
if(isError)return<p>error is{error}</p>
if(isLoading) return <CircularProgress/>

    

        const addToCart= async (id)=>{
try{
const response= await AxiosUserInstanse.post(`/Customer/Carts`,
  {productId:id},
);if( response.status== 200 ){
   toast.success('product added succesfully', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Zoom,
});
  }
  queryClient.invalidateQueries(['cartItems']);
  console.log(response);
}catch(error){

}finally{

}        }
  


    console.log(id);
  return (
    <Box py={5}>
      <Card sx={{display:'flex',alignItems:'center',boxShadow:5}}>
        <CardMedia sx={{width:400,p:4}} component='img' image={data.data.mainImageUrl}>
        </CardMedia>
        <CardContent sx={{display:'flex',flexDirection:'column',gap:'20px'}} >
          <Typography component={'h2'} variant='h6'>
            {data.data.name}
          </Typography>
          <Rating value={data.data.rate}   />
          <Typography component="p" variant='body1'>
            {data.data.description}
          </Typography>
          <Typography component="p" variant='body1'>
            price: {data.data.price}$
          </Typography>
          <Typography component="h6" variant='body1'>
            Category:<Chip label={data.data.categoryName}/> 
            
          </Typography>
          <Typography component="h6" variant='body1'>
            Brand:<Chip label={data.data.brandName}/> 
          </Typography>
          <Button variant='contained' color='primary' onClick={()=>addToCart(data.data.id)}>Add To Cart</Button>
        </CardContent>
      </Card>
    </Box>
  )
}
