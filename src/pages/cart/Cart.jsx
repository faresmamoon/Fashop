import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Cart() {
      const [carts,setCarts] = useState([]);
        const [isLoading,setIsLoading]=useState(true);
 const getProducts=async()=>{
  try{
    const token=localStorage.getItem("userToken");
    const response= await axios.get(`https://kashop1.runasp.net/api/Customer/Carts`,
      
{
  headers:{
  Authorization:`Bearer ${token}`
}

});
    
console.log(response);
setCarts(response.data);
  }catch(error){
    console.log(error);

  }finally{
setIsLoading(false);
  } }
const removeItem= async(productId)=>{
  try{
        const token=localStorage.getItem("userToken");
const response = await axios.delete(`https://kashop1.runasp.net/api/Customer/Carts/${productId}`,
  { headers:{
  Authorization:`Bearer ${token}`
}}
)
getProducts();
  }catch(error){

  }finally{

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
          {carts.items.map((item)=>
          <TableRow>
            <TableCell>  {item.productName} </TableCell>
            <TableCell>  {item.price}$ </TableCell>
            <TableCell>  {item.count} </TableCell>
            <TableCell>  {item.totalPrice} </TableCell>
            <TableCell>  <Button color='error' onClick={()=>removeItem(item.productId)}>Remove</Button> </TableCell>
          </TableRow>
          )}
          <TableRow>
            <TableCell colSpan={3}>
              <Typography> Card Total </Typography>
            </TableCell>
             <TableCell>
              {carts.cartTotal}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
