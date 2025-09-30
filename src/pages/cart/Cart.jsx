import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
export default function Cart() {
    const queryClient=useQueryClient();

      const fetchProducts=async()=>{
    const response = await AxiosUserInstanse.get('/Customer/Carts');
    return response;
   }
   const {data,isLoading,isError,error}=useQuery({
    queryKey:['cartItems'],
    queryFn:fetchProducts,
    staleTime:1000*60*5
   });
   const incrementItem=async (productId)=>{
    const response= await AxiosUserInstanse.post(`/Customer/Carts/increment/${productId}`,{});
    if(response.status == 200){
        queryClient.invalidateQueries(['cartItems']);

    }

   }
   const removeItem=async (productId)=>{
    const response= await AxiosUserInstanse.delete(`/Customer/Carts/${productId}`);
    if(response.status == 200){
        queryClient.invalidateQueries(['cartItems']);

    }

   }
    const clearCart=async ()=>{
    const response= await AxiosUserInstanse.delete(`/Customer/Carts/clear`);
    if(response.status == 200){
        queryClient.invalidateQueries(['cartItems']);

    }}
   const decrementItem=async (item)=>{
  if(item.count == 1){
      removeItem(item.productId);
       return;
    }    const response= await AxiosUserInstanse.post(`/Customer/Carts/decrement/${item.productId}`,{});
    if(response.status == 200){
        queryClient.invalidateQueries(['cartItems']);

   }}
   if(isError)return<p>error is{error}</p>
if(isLoading) return <CircularProgress/>
        return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> Product Name </TableCell>
            <TableCell> Price </TableCell>
            <TableCell> Quantity </TableCell>
            <TableCell> Total </TableCell>
            <TableCell> Action </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.data.items.map((item)=>
          <TableRow key={item.productId}> 
            <TableCell>  {item.productName} </TableCell>
            <TableCell>  {item.price}$  </TableCell>
            <TableCell >
             <Box sx={{display:'flex',alignItems:'center',gap:'8px'}}>
<RemoveIcon sx={{fontSize:15}}  onClick={()=>decrementItem(item)}></RemoveIcon>  
            {item.count}
             <AddIcon sx={{fontSize:15}}  onClick={()=>incrementItem(item.productId)}></AddIcon>
              </Box>
               </TableCell>
            <TableCell>  {item.totalPrice}  </TableCell>
             <TableCell>  <Button color='error' onClick={()=>removeItem(item.productId)}>Remove</Button> </TableCell>
          
          </TableRow>
          )}
          <TableRow>
            <TableCell colSpan={3}>
              <Typography> Card Total </Typography>
            </TableCell>
             <TableCell>
              {data.data.cartTotal}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} align='right' >
              <Box sx={{display:'flex',justifyContent:'flex-end',gap:'1px'}}>
                 <Button variant='contained' color='error' onClick={clearCart}>
                Cler Cart
              </Button>
               <Button component={Link} to='/checkout' variant='contained' color='primary' >
               Checkout
              </Button>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
