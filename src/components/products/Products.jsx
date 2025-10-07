import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import AxiosInstanse from '../../api/AxiosInstanse';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Products() {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchProducts = async () => {
    const response = await AxiosInstanse.get(`/Customer/Products`, {
      params: {
        limit: 10,
        skip: 0,
        sortBy: sortBy,
        sortOrder: sortOrder
      }
    });
    return response;
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['Products', sortBy, sortOrder],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5
  });

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  if (isError) return <p>Error: {error.message}</p>
  if (isLoading) return <CircularProgress />

  return (
    <Box py={5}>
      <Typography variant="h3" component="h2">
        {t("Products")}
      </Typography>

      {/* Separate Sorting Controls */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, mt: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={handleSortByChange}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Order</InputLabel>
          <Select
            value={sortOrder}
            label="Order"
            onChange={handleSortOrderChange}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {data.data.data.map((product) => (
          <Grid key={product.id} item xs={12} width={'100%'}>
            <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, display: "flex" }}>
                <CardMedia 
                  alt={product.name} 
                  sx={{ width: 150, p: 2, objectFit: "contain" }} 
                  component='img' 
                  image={product.mainImageUrl}
                />
                <CardContent sx={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "center",
                  flex: 1 
                }}>
                  <Typography variant="h6" fontWeight="bold">
                    {product.name}
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}