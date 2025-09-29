import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import AxiosInstanse from "../../api/AxiosInstanse";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export default function Brands() {
       const { t} = useTranslation();
    
    const fetchBrands= async()=>{
          const response=await AxiosInstanse.get(`/Brands`);
return response;
    }
    const{data,isLoading,isError,error}=useQuery({
      queryKey:['brands'],
      queryFn:fetchBrands,
      staleTime:1000 * 60 * 5
    })
if(isError)return<p>error is{error}</p>
if(isLoading) return <CircularProgress/>
  return (
   <Box py={5}  >
<Typography variant="h3" component="h2">
{t("Brands")}
</Typography>
<Grid container spacing={3}>
   {data.data.map((brand)=>(
    <Grid key={brand.id} item xs={12} sm={6} md={4} lg={3}  >
        <Card  sx={{boxShadow:5,borderRadius:3}}>
            <CardMedia alt={brand.name} height="160" sx={{p:2}} component='img' image={brand.mainImageUrl}>
            </CardMedia>
            <CardContent>
                <Typography align="center" variant="h6">{brand.name}</Typography>
            </CardContent>
        </Card>
    </Grid>
   ))}
</Grid>
   </Box>
  )
}
