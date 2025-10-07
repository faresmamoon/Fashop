import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  Grid, 
  Chip,
  Button,
  Divider,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import { 
  ShoppingBag,
  LocalShipping,
  CheckCircle,
  Pending,
  Cancel,
  Visibility,
  Download,
  Repeat,
  Star,
  ArrowForward
} from '@mui/icons-material';

// Mock order data
const ordersData = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    items: 3,
    total: 149.99,
    trackingNumber: 'TRK123456789',
    itemsList: [
      { name: 'Wireless Headphones', price: 79.99, quantity: 1, image: '/api/placeholder/60/60' },
      { name: 'Phone Case', price: 24.99, quantity: 2, image: '/api/placeholder/60/60' }
    ]
  },
  {
    id: 'ORD-002',
    date: '2024-01-12',
    status: 'shipped',
    items: 2,
    total: 89.50,
    trackingNumber: 'TRK987654321',
    itemsList: [
      { name: 'Smart Watch', price: 199.99, quantity: 1, image: '/api/placeholder/60/60' },
      { name: 'Charging Cable', price: 19.99, quantity: 1, image: '/api/placeholder/60/60' }
    ]
  },
  {
    id: 'ORD-003',
    date: '2024-01-10',
    status: 'processing',
    items: 1,
    total: 45.00,
    trackingNumber: null,
    itemsList: [
      { name: 'Bluetooth Speaker', price: 45.00, quantity: 1, image: '/api/placeholder/60/60' }
    ]
  },
  {
    id: 'ORD-004',
    date: '2024-01-05',
    status: 'cancelled',
    items: 2,
    total: 120.00,
    trackingNumber: null,
    itemsList: [
      { name: 'Laptop Bag', price: 59.99, quantity: 1, image: '/api/placeholder/60/60' },
      { name: 'Mouse Pad', price: 15.00, quantity: 1, image: '/api/placeholder/60/60' }
    ]
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'delivered': return 'success';
    case 'shipped': return 'primary';
    case 'processing': return 'warning';
    case 'cancelled': return 'error';
    default: return 'default';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'delivered': return <CheckCircle />;
    case 'shipped': return <LocalShipping />;
    case 'processing': return <Pending />;
    case 'cancelled': return <Cancel />;
    default: return <Pending />;
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'delivered': return 'Delivered';
    case 'shipped': return 'Shipped';
    case 'processing': return 'Processing';
    case 'cancelled': return 'Cancelled';
    default: return 'Pending';
  }
};

export default function Orders() {
  const theme = useTheme();

  return (
    <Box sx={{ 
      py: 8, 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh'
    }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            fontWeight="bold" 
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #2c3e50 30%, #3498db 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: { xs: '2.5rem', md: '3rem' }
            }}
          >
            My Orders
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}
          >
            Track your orders, view order history, and manage your purchases
          </Typography>
          
          {/* Order Stats */}
          <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
            <Grid item xs={6} sm={3}>
              <Paper 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: 3
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  {ordersData.length}
                </Typography>
                <Typography variant="body2">
                  Total Orders
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  borderRadius: 3
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  {ordersData.filter(order => order.status === 'delivered').length}
                </Typography>
                <Typography variant="body2">
                  Delivered
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  color: 'white',
                  borderRadius: 3
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  {ordersData.filter(order => order.status === 'shipped').length}
                </Typography>
                <Typography variant="body2">
                  In Transit
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  color: 'white',
                  borderRadius: 3
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  ${ordersData.reduce((total, order) => total + order.total, 0).toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  Total Spent
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Orders List */}
        <Card 
          sx={{ 
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(0,0,0,0.1)',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
          }}
        >
          <CardContent sx={{ p: 0 }}>
            {/* Table Header */}
            <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h5" fontWeight="bold">
                Order History
              </Typography>
            </Box>

            {/* Orders Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.04) }}>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Order Details</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Items</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ordersData.map((order) => (
                    <TableRow 
                      key={order.id}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: alpha(theme.palette.primary.main, 0.02) 
                        },
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            sx={{
                              width: 60,
                              height: 60,
                              backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              borderRadius: 2
                            }}
                          >
                            <ShoppingBag sx={{ color: theme.palette.primary.main }} />
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {order.id}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {order.items} item{order.items > 1 ? 's' : ''}
                            </Typography>
                            {order.trackingNumber && (
                              <Typography variant="body2" color="primary">
                                Track: {order.trackingNumber}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" fontWeight="medium">
                          {new Date(order.date).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack spacing={1}>
                          {order.itemsList.slice(0, 2).map((item, index) => (
                            <Typography key={index} variant="body2" color="text.secondary">
                              {item.quantity}x {item.name}
                            </Typography>
                          ))}
                          {order.itemsList.length > 2 && (
                            <Typography variant="body2" color="primary">
                              +{order.itemsList.length - 2} more
                            </Typography>
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6" fontWeight="bold" color="primary">
                          ${order.total.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(order.status)}
                          label={getStatusText(order.status)}
                          color={getStatusColor(order.status)}
                          variant="filled"
                          sx={{ fontWeight: 'bold' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton 
                            size="small" 
                            sx={{ 
                              backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.2) }
                            }}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                          {order.status === 'delivered' && (
                            <>
                              <IconButton 
                                size="small"
                                sx={{ 
                                  backgroundColor: alpha(theme.palette.success.main, 0.1),
                                  '&:hover': { backgroundColor: alpha(theme.palette.success.main, 0.2) }
                                }}
                              >
                                <Star fontSize="small" />
                              </IconButton>
                              <IconButton 
                                size="small"
                                sx={{ 
                                  backgroundColor: alpha(theme.palette.info.main, 0.1),
                                  '&:hover': { backgroundColor: alpha(theme.palette.info.main, 0.2) }
                                }}
                              >
                                <Repeat fontSize="small" />
                              </IconButton>
                            </>
                          )}
                          <IconButton 
                            size="small"
                            sx={{ 
                              backgroundColor: alpha(theme.palette.grey[500], 0.1),
                              '&:hover': { backgroundColor: alpha(theme.palette.grey[500], 0.2) }
                            }}
                          >
                            <Download fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Footer Actions */}
            <Box sx={{ p: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
              <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Showing {ordersData.length} orders
                </Typography>
                <Button 
                  variant="outlined" 
                  endIcon={<ArrowForward />}
                  sx={{ borderRadius: 2 }}
                >
                  View All Orders
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                p: 3, 
                borderRadius: 3,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)' }
              }}
            >
              <LocalShipping sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Track Order
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                Monitor your shipment in real-time
              </Typography>
              <Button variant="contained" sx={{ backgroundColor: 'white', color: '#667eea' }}>
                Track Now
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                p: 3, 
                borderRadius: 3,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)' }
              }}
            >
              <Repeat sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Returns & Exchange
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                Easy returns within 30 days
              </Typography>
              <Button variant="contained" sx={{ backgroundColor: 'white', color: '#f093fb' }}>
                Start Return
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                p: 3, 
                borderRadius: 3,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)' }
              }}
            >
              <Star sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Rate Products
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                Share your experience with others
              </Typography>
              <Button variant="contained" sx={{ backgroundColor: 'white', color: '#4facfe' }}>
                Write Review
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}