import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';import AxiosUserInstanse from '../../api/AxiosUserInstanse';
export default function Cart() {
      const [carts,setCarts] = useState([]);
        const [isLoading,setIsLoading]=useState(true);
 const getProducts=async()=>{
  try{
    const token=localStorage.getItem("userToken");
    const response= await AxiosUserInstanse.get(`/Carts`,);
    
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
const response = await AxiosUserInstanse.delete(`/Carts/${productId}`,
)
getProducts();
  }catch(error){

  }finally{

  }
}
 const  clearCart=async()=>{
  try{
        const token=localStorage.getItem("userToken");
const response = await AxiosUserInstanse.delete(`/Carts/clear`,
);
if(response.status == 200){
  getProducts();
}

  }catch(error){
console.log(error);
  }finally{

  }
 }
 const incrementItem= async(productId)=>{
  try{
    const token=localStorage.getItem('userToken');
    const response=await AxiosUserInstanse.post(`/Carts/increment/${productId}`,{},
     
    ); 
    if(response.status == 200){
        getProducts();
      }
  }catch(error){
    console.log(error)
  }finally{

  }

 }
 const decrementItem= async(item)=>{
  try{
   if(item.count == 1){
      removeItem(item.productId);
       getProducts();
       return;
    }
    const token=localStorage.getItem('userToken');
    const response=await AxiosUserInstanse.post(`/Carts/decrement/${item.productId}`,{},
    ); 
   
    if(response.status == 200){
        getProducts();
      } 
      
  }catch(error){
    console.log(error)
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
              {carts.cartTotal}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} align='right' >
              <Button variant='contained' color='error' onClick={clearCart}>
                Cler Cart
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
