import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

export default function Checkout() {
  const fetchProducts = async () => {
    const response = await AxiosUserInstanse.get('/Carts');
    return response;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cartItems'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  const { control, handleSubmit } = useForm({});

  const cartItems = data?.data?.items || [];
  const cartTotal = data?.data?.cartTotal || 0;

  const onSubmit = async (formData) => {
    const response = await AxiosUserInstanse.post('/Customer/CheckOut/payment', {
      paymentMethod: formData.paymentMethod,
    });
    if (response.status === 200) {
      console.log(response);
      location.href = response.data.url;
    }
  };

  if (isError) return <Typography color="error">Error: {error.message}</Typography>;
  if (isLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Checkout
      </Typography>

      {/* Cart Items */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        {cartItems.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            Your cart is empty.
          </Typography>
        ) : (
          <>
            {cartItems.map((item) => (
              <Card
                key={item.productId}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: 2,
                  backgroundColor: 'background.paper',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.productName}
                    </Typography>
                    <Typography color="text.secondary">
                      {item.count} × ${item.price}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    ${(item.count * item.price).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            ))}

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" textAlign="right" fontWeight="bold">
              Total: ${cartTotal.toFixed(2)}
            </Typography>
          </>
        )}
      </Paper>

      {/* Payment Form */}
      {cartItems.length > 0 && (
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            backgroundColor: 'background.paper',
            p: 3,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Controller
            control={control}
            name="paymentMethod"
            defaultValue="Visa"
            render={({ field }) => (
              <Box>
                <FormLabel sx={{ mb: 1 }}>Payment Method</FormLabel>
                <RadioGroup row {...field}>
                  <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                  <FormControlLabel value="Visa" control={<Radio />} label="Visa" />
                </RadioGroup>
              </Box>
            )}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              alignSelf: 'center',
              width: { xs: '100%', sm: '50%' },
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold',
              py: 1.5,
            }}
          >
            Create Order
          </Button>
        </Box>
      )}
    </Box>
  );
}
