import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Categories() {
      const [categories,setCategories]=useState([]);
      const [isLoading,setIsLoading]=useState(true);
      
      const getCategories=async()=>{
        try{
        const response=await axios.get(`https://kashop1.runasp.net/api/Customer/Categories`);
        console.log(response);
        setCategories(response.data)
        }catch(error){
    console.log(error);
        }finally{
            setIsLoading(false);
        }
    
      }
      useEffect(()=>{
        getCategories();
      },[]);
      if(isLoading){
        return(
            <CircularProgress/>
        )
      }
  return (
 <Box py={5}  >
<Typography variant="h3" component="h2">
our Categorie
</Typography>
<Grid container spacing={3}>
   {categories.map((categorie)=>(
    <Grid key={categorie.id} item xs={12} sm={6} md={4} lg={3}  >
        <Card sx={{boxShadow:5,borderRadius:3}}>
           
            <CardContent>
                <Typography align="center" variant="h6">{categorie.name}</Typography>
            </CardContent>
        </Card>
    </Grid>
   ))}
</Grid>
   </Box>
  )  
}
