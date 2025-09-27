import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import AxiosInstanse from '../../api/AxiosInstanse';

export default function Categories() {
     const fetchCategories= async()=>{
          const response=await AxiosInstanse.get(`/Categories`);
return response;
    }
    const{data,isLoading,isError,error}=useQuery({
      queryKey:['Categories'],
      queryFn:fetchCategories,
      staleTime:1000 * 60 * 5
    })
if(isError)return<p>error is{error}</p>
if(isLoading) return <CircularProgress/>
  return (
 <Box py={5}  >
<Typography variant="h3" component="h2">
our Categorie
</Typography>
<Grid container spacing={3}>
   {data.data.map((categorie)=>(
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
