import { 
  Button, 
  CircularProgress, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography, 
  Box,
  Paper,
  Card,
  CardContent,
  Grid,
  IconButton,
  Chip,
  Divider,
  Container,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Modal,
  useTheme,
  alpha
} from '@mui/material';
import { 
  Add as AddIcon, 
  Remove as RemoveIcon, 
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
  ClearAll as ClearAllIcon,
  ArrowBack as ArrowBackIcon,
  ShoppingBag as ShoppingBagIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';
import React, { useState, useContext } from 'react';
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ThemeContext } from "../../context/ThemeContext";

export default function Cart() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const theme = useTheme();
  const { mode } = useContext(ThemeContext);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);

  // Theme-based colors
  const getBackgroundColor = () => {
    return mode === 'light' 
      ? '#FFF8F0'
      : '#1a1a1a';
  };

  const getPaperColor = () => {
    return mode === 'light'
      ? '#FAF0E6'
      : '#2d2d2d';
  };

  const getPrimaryColor = () => {
    return mode === 'light' ? '#8B4513' : '#D2691E';
  };

  const getSecondaryColor = () => {
    return mode === 'light' ? '#D2691E' : '#CD853F';
  };

  const getTextColor = () => {
    return mode === 'light' ? '#5D4037' : '#E8D5B5';
  };

  const fetchProducts = async () => {
    const response = await AxiosUserInstanse.get('/Customer/Carts');
    return response;
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cartItems'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5
  });

  const incrementItem = async (productId) => {
    try {
      const response = await AxiosUserInstanse.post(`/Customer/Carts/increment/${productId}`, {});
      if (response.status === 200) {
        queryClient.invalidateQueries(['cartItems']);
      }
    } catch (error) {
      console.error('Error incrementing item:', error);
    }
  }

  const removeItem = async (productId, productName) => {
    const result = await Swal.fire({
      title: 'Remove Item?',
      text: `Are you sure you want to remove "${productName}" from your cart?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: getPrimaryColor(),
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
      background: getBackgroundColor(),
      color: getTextColor(),
    });

    if (result.isConfirmed) {
      try {
        const response = await AxiosUserInstanse.delete(`/Customer/Carts/${productId}`);
        if (response.status === 200) {
          queryClient.invalidateQueries(['cartItems']);
          Swal.fire({
            title: 'Removed!',
            text: 'Item has been removed from your cart.',
            icon: 'success',
            confirmButtonColor: getPrimaryColor(),
            background: getBackgroundColor(),
            color: getTextColor(),
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to remove item from cart.',
          icon: 'error',
          confirmButtonColor: getPrimaryColor(),
          background: getBackgroundColor(),
          color: getTextColor(),
        });
      }
    }
  }

  const clearCart = async () => {
    const result = await Swal.fire({
      title: 'Clear Entire Cart?',
      text: 'This will remove all items from your cart. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: getPrimaryColor(),
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, clear cart!',
      cancelButtonText: 'Cancel',
      background: getBackgroundColor(),
      color: getTextColor(),
    });

    if (result.isConfirmed) {
      try {
        const response = await AxiosUserInstanse.delete(`/Customer/Carts/clear`);
        if (response.status === 200) {
          queryClient.invalidateQueries(['cartItems']);
          setClearDialogOpen(false);
          Swal.fire({
            title: 'Cleared!',
            text: 'Your cart has been cleared.',
            icon: 'success',
            confirmButtonColor: getPrimaryColor(),
            background: getBackgroundColor(),
            color: getTextColor(),
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to clear cart.',
          icon: 'error',
          confirmButtonColor: getPrimaryColor(),
          background: getBackgroundColor(),
          color: getTextColor(),
        });
      }
    }
  }

  const decrementItem = async (item) => {
    if (item.count === 1) {
      removeItem(item.productId, item.productName);
      return;
    }
    try {
      const response = await AxiosUserInstanse.post(`/Customer/Carts/decrement/${item.productId}`, {});
      if (response.status === 200) {
        queryClient.invalidateQueries(['cartItems']);
      }
    } catch (error) {
      console.error('Error decrementing item:', error);
    }
  }

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh" flexDirection="column" sx={{ bgcolor: getBackgroundColor() }}>
      <CircularProgress size={60} thickness={4} sx={{ color: getPrimaryColor() }} />
      <Typography variant="h6" sx={{ mt: 3, color: getTextColor() }}>
        Loading your cart...
      </Typography>
    </Box>
  );

  if (isError) return (
    <Container maxWidth="md" sx={{ bgcolor: getBackgroundColor(), minHeight: '100vh', py: 4 }}>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh" flexDirection="column" gap={3}>
        <Typography color="error" variant="h5">
          Error loading cart
        </Typography>
        <Typography color={getTextColor()}>
          {error?.message || 'Unable to load cart items'}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => queryClient.refetchQueries(['cartItems'])}
          sx={{ bgcolor: getPrimaryColor(), '&:hover': { bgcolor: getSecondaryColor() } }}
        >
          Try Again
        </Button>
      </Box>
    </Container>
  );

  const cartItems = data?.data?.items || [];
  const cartTotal = data?.data?.cartTotal || 0;

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ bgcolor: getBackgroundColor(), minHeight: '100vh', py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh" flexDirection="column" gap={3}>
          <ShoppingCartIcon sx={{ fontSize: 80, color: getPrimaryColor() }} />
          <Typography variant="h4" color={getTextColor()} textAlign="center">
            Your cart is empty
          </Typography>
          <Typography variant="body1" color={getTextColor()} textAlign="center" sx={{ opacity: 0.8 }}>
            Start shopping to add items to your cart
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => navigate('/products')}
            startIcon={<ShoppingBagIcon />}
            sx={{ 
              mt: 2, 
              bgcolor: getPrimaryColor(),
              '&:hover': { bgcolor: getSecondaryColor() }
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: getBackgroundColor(), minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4, px: { xs: 2, sm: 0 } }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate(-1)}
            sx={{ 
              mb: 2, 
              color: getPrimaryColor(),
              '&:hover': { backgroundColor: alpha(getPrimaryColor(), 0.1) }
            }}
          >
            Back
          </Button>
          <Typography variant="h3" fontWeight="bold" gutterBottom color={getTextColor()}>
            🛒 Shopping Cart
          </Typography>
          <Typography variant="h6" color={getTextColor()} sx={{ opacity: 0.8 }}>
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 4 }} justifyContent={'center'}>
          {/* Cart Items */}
          <Grid item xs={12} lg={8}>
            <Paper 
              elevation={2} 
              sx={{ 
                borderRadius: { xs: 2, md: 3 }, 
                overflow: 'hidden',
                bgcolor: getPaperColor(),
                border: `1px solid ${alpha(getPrimaryColor(), 0.1)}`
              }}
            >
              <TableContainer sx={{ maxHeight: { xs: 400, md: 'none' } }}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: getPrimaryColor() }}>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                        Product
                      </TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                        Price
                      </TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                        Quantity
                      </TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                        Total
                      </TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow 
                        key={item.productId}
                        sx={{ 
                          '&:hover': { bgcolor: alpha(getPrimaryColor(), 0.05) },
                          transition: 'background-color 0.2s'
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                              sx={{
                                width: { xs: 50, md: 60 },
                                height: { xs: 50, md: 60 },
                                bgcolor: alpha(getPrimaryColor(), 0.1),
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: `1px solid ${alpha(getPrimaryColor(), 0.2)}`
                              }}
                            >
                              <ShoppingBagIcon sx={{ color: getPrimaryColor(), fontSize: { xs: 20, md: 24 } }} />
                            </Box>
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold" color={getTextColor()} sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                                {item.productName}
                              </Typography>
                              <Chip 
                                label="In Stock" 
                                color="success" 
                                size="small" 
                                variant="outlined"
                                sx={{ 
                                  borderColor: getPrimaryColor(),
                                  fontSize: { xs: '0.7rem', md: '0.8rem' }
                                }}
                              />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" fontWeight="bold" color={getPrimaryColor()} sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                            ${item.price}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton 
                              onClick={() => decrementItem(item)}
                              size="small"
                              sx={{ 
                                border: `1px solid ${getPrimaryColor()}`,
                                borderRadius: 1,
                                color: getPrimaryColor(),
                                '&:hover': { bgcolor: getPrimaryColor(), color: 'white' }
                              }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography 
                              sx={{ 
                                minWidth: 30, 
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: { xs: '0.9rem', md: '1.1rem' },
                                color: getTextColor()
                              }}
                            >
                              {item.count}
                            </Typography>
                            <IconButton 
                              onClick={() => incrementItem(item.productId)}
                              size="small"
                              sx={{ 
                                border: `1px solid ${getPrimaryColor()}`,
                                borderRadius: 1,
                                color: getPrimaryColor(),
                                '&:hover': { bgcolor: getPrimaryColor(), color: 'white' }
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" fontWeight="bold" color={getPrimaryColor()} sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                            ${item.totalPrice}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <IconButton 
                            onClick={() => removeItem(item.productId, item.productName)}
                            sx={{
                              color: getPrimaryColor(),
                              '&:hover': {
                                bgcolor: '#EF5350',
                                color: 'white'
                              }
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Action Buttons Sidebar */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              <Card 
                elevation={3} 
                sx={{ 
                  borderRadius: { xs: 2, md: 3 },
                  bgcolor: getPaperColor(),
                  border: `1px solid ${alpha(getPrimaryColor(), 0.1)}`
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom color={getTextColor()}>
                    Cart Actions
                  </Typography>
                  
                  <Stack spacing={2} sx={{ mt: 3 }}>
                    <Button 
                      onClick={() => setOrderSummaryOpen(true)}
                      variant="contained" 
                      size="large"
                      fullWidth
                      startIcon={<ReceiptIcon />}
                      sx={{ 
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 'bold',
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        bgcolor: getPrimaryColor(),
                        '&:hover': { bgcolor: getSecondaryColor() }
                      }}
                    >
                      View Order Summary
                    </Button>
                    
                    <Button 
                      component={Link}
                      to="/checkout"
                      variant="contained" 
                      size="large"
                      fullWidth
                      sx={{ 
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 'bold',
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        bgcolor: getSecondaryColor(),
                        '&:hover': { bgcolor: getPrimaryColor() }
                      }}
                    >
                      Proceed to Checkout
                    </Button>
                    
                    <Button 
                      onClick={clearCart}
                      variant="outlined" 
                      color="error"
                      size="large"
                      fullWidth
                      startIcon={<ClearAllIcon />}
                      sx={{ 
                        py: 1.5,
                        borderRadius: 2,
                        borderColor: '#EF5350',
                        color: '#EF5350',
                        '&:hover': { 
                          borderColor: '#D32F2F',
                          bgcolor: alpha('#EF5350', 0.1)
                        }
                      }}
                    >
                      Clear Cart
                    </Button>

                    <Button 
                      component={Link}
                      to="/products"
                      variant="text" 
                      size="large"
                      fullWidth
                      sx={{ 
                        py: 1.5,
                        borderRadius: 2,
                        color: getPrimaryColor(),
                        '&:hover': { bgcolor: alpha(getPrimaryColor(), 0.1) }
                      }}
                    >
                      Continue Shopping
                    </Button>
                  </Stack>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <Card 
                elevation={2} 
                sx={{ 
                  borderRadius: { xs: 2, md: 3 }, 
                  bgcolor: alpha(getPrimaryColor(), 0.1),
                  border: `1px solid ${alpha(getPrimaryColor(), 0.2)}`
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
                  <Typography variant="body2" color={getTextColor()} textAlign="center" fontWeight="bold">
                    🚚 Free shipping on orders over $50
                  </Typography>
                  <Typography variant="body2" color={getTextColor()} textAlign="center" sx={{ mt: 0.5, opacity: 0.8 }}>
                    🔄 30-day return policy
                  </Typography>
                  <Typography variant="body2" color={getTextColor()} textAlign="center" sx={{ mt: 0.5, opacity: 0.8 }}>
                    💳 Secure checkout
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        {/* Order Summary Modal */}
        <Modal
          open={orderSummaryOpen}
          onClose={() => setOrderSummaryOpen(false)}
          aria-labelledby="order-summary-modal"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', sm: 400 },
            bgcolor: getPaperColor(),
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            border: `2px solid ${getPrimaryColor()}`
          }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom color={getTextColor()} textAlign="center">
              📋 Order Summary
            </Typography>
            <Divider sx={{ my: 2, bgcolor: getPrimaryColor() }} />
            
            <Stack spacing={2} sx={{ my: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color={getTextColor()}>Subtotal</Typography>
                <Typography fontWeight="bold" color={getTextColor()}>${cartTotal}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color={getTextColor()}>Shipping</Typography>
                <Typography color="success.main" fontWeight="bold">FREE</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color={getTextColor()}>Tax</Typography>
                <Typography color={getTextColor()}>${(cartTotal * 0.1).toFixed(2)}</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="bold" color={getTextColor()}>Total</Typography>
                <Typography variant="h6" fontWeight="bold" color={getPrimaryColor()}>
                  ${(cartTotal * 1.1).toFixed(2)}
                </Typography>
              </Box>
            </Stack>

            <Button 
              variant="contained"
              fullWidth
              onClick={() => setOrderSummaryOpen(false)}
              sx={{
                bgcolor: getPrimaryColor(),
                '&:hover': { bgcolor: getSecondaryColor() },
                borderRadius: 2,
                py: 1.5
              }}
            >
              Close Summary
            </Button>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
}