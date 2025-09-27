import { Box, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { Link } from 'react-router-dom';
import AxiosInstanse from '../../api/AxiosInstanse';

export default function Products() {
   const fetchProducts= async()=>{
          const response=await AxiosInstanse.get(`/Products`);
return response;
    }
    const{data,isLoading,isError,error}=useQuery({
      queryKey:['Products'],
      queryFn:fetchProducts,
      staleTime:1000 * 60 * 5
    })
if(isError)return<p>error is{error}</p>
if(isLoading) return <CircularProgress/>
  return (
   <Box py={5}  >
<Typography variant="h3" component="h2">
Products
</Typography>
<Grid container spacing={3}>
   {data.data.map((product)=>(
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
