import { useQuery } from '@tanstack/react-query';
import React from 'react'
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import { Box, Button, Card, CardContent, CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

export default function Checkout() {
    const fetchProducts=async()=>{
    const response = await AxiosUserInstanse.get('/Carts');
    return response;
   }
   const {data,isLoading,isError,error}=useQuery({
    queryKey:['cartItems'],
    queryFn:fetchProducts,
    staleTime:1000*60*5
   });
   const {register,control,handleSubmit}=useForm({});
      const cartItemCount=(data?.data.items.length);
const cartItems=data?.data.items;
const onSubmit=async(formData)=>{
    const response = await AxiosUserInstanse.post('/Customer/CheckOut/payment',{
        paymentMethod:formData.paymentMethod
    });
    if(response.status == 200){
        console.log(response);
        location.href=response.data.url;
    }
}
      if(isError)return<p>error is{error}</p>
   if(isLoading) return <CircularProgress/>

  return (
<Box py={5}>
    <Typography variant='h5'>
        Checkout
    </Typography>
    {cartItems.map(item=>(
        <Card key={item.productId} sx={{mb:3}}> 
        <CardContent sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Typography variant='h6'>{item.productName}</Typography>
        <Typography>{item.count}*{item.price}$={item.count*item.price}$</Typography>
        </CardContent>
        </Card>
    ))}
    <Typography variant='h6' mt={2} >Total: {data.data.cartTotal}$</Typography>
    <Box onSubmit={handleSubmit(onSubmit)}
component={"form"} sx={{display:"flex",
  flexDirection:"column",
  gap:4,
  mt:5}}>
   <Controller
   control={control}
   name='paymentMethod' defaultValue={'Visa'}
   render={({field})=>(
    <Box>
      <FormLabel>Payment Method</FormLabel>
      <RadioGroup {...field}>
            <FormControlLabel value={'Cash'} control={<Radio/>} label="Cash"/>
            <FormControlLabel value={'Visa'} control={<Radio/>} label="Visa"/>

      </RadioGroup>
    </Box>
   )}
   />

  
 <Button type='submit' variant="contained" size='large' >
    create order
    </Button>
  </Box>
</Box>  )
}
