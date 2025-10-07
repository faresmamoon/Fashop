import { Box, Button, Card, CardContent, CardMedia, Chip, CircularProgress, Rating, Typography, Grid, Divider, Avatar, Modal, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import { toast, Zoom } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AxiosInstanse from '../../api/AxiosInstanse';

export default function ProductsDetails() { 
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState('');
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProductDetails = async () => {
    const response = await AxiosInstanse.get(`/Customer/Products/${id}`);
    return response;
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['Products', id],
    queryFn: fetchProductDetails,
    staleTime: 1000 * 60 * 5
  })

  // Set selected image when data loads
  React.useEffect(() => {
    if (data?.data) {
      setSelectedImage(data.data.mainImageUrl);
    }
  }, [data]);

  if (isError) return <p>Error: {error.message}</p>
  if (isLoading) return <CircularProgress />

  const addToCart = async (id) => {
    try {
      const response = await AxiosUserInstanse.post(`/Customer/Carts`,
        { productId: id },
      );
      if (response.status === 200) {
        toast.success('Product added successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        });
      }
      queryClient.invalidateQueries(['cartItems']);
      console.log(response);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  const handleAddReview = async () => {
    if (reviewRating === 0) {
      toast.error('Please select a rating', {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      return;
    }

    if (!reviewComment.trim()) {
      toast.error('Please write a review comment', {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await AxiosUserInstanse.post(`/Customer/Reviews`, {
        productId: parseInt(id),
        rate: reviewRating,
        comment: reviewComment
      });

      if (response.status === 200) {
        toast.success('Review added successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        });
        
        // Close dialog and reset form
        setReviewDialogOpen(false);
        setReviewRating(0);
        setReviewComment('');
        
        // Refresh product data to show the new review
        queryClient.invalidateQueries(['Products', id]);
      }
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Failed to add review. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenReviewDialog = () => {
    setReviewDialogOpen(true);
  };

  const handleCloseReviewDialog = () => {
    setReviewDialogOpen(false);
    setReviewRating(0);
    setReviewComment('');
  };

  const product = data.data;

  return (
    <Box py={5}>
      {/* Product Details Section */}
      <Card sx={{ display: 'flex', alignItems: 'flex-start', boxShadow: 5, p: 3, mb: 4 }}>
        {/* Images Section */}
        <Box sx={{ width: 500, mr: 4 }}>
          {/* Main Image */}
          <CardMedia 
            sx={{ 
              width: '100%', 
              height: 400, 
              objectFit: 'contain',
              borderRadius: 2,
              mb: 2
            }} 
            component='img' 
            image={selectedImage || product.mainImageUrl}
          />
          
          {/* Sub Images Gallery */}
          {product.subImageUrls && product.subImageUrls.length > 0 && (
            <Grid container spacing={1}>
              {/* Main image thumbnail */}
              <Grid item>
                <CardMedia 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    objectFit: 'cover',
                    borderRadius: 1,
                    cursor: 'pointer',
                    border: selectedImage === product.mainImageUrl ? '2px solid #1976d2' : '1px solid #e0e0e0'
                  }} 
                  component='img' 
                  image={product.mainImageUrl}
                  onClick={() => setSelectedImage(product.mainImageUrl)}
                />
              </Grid>
              {/* Sub images thumbnails */}
              {product.subImageUrls.map((subImage, index) => (
                <Grid item key={index}>
                  <CardMedia 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      objectFit: 'cover',
                      borderRadius: 1,
                      cursor: 'pointer',
                      border: selectedImage === subImage ? '2px solid #1976d2' : '1px solid #e0e0e0'
                    }} 
                    component='img' 
                    image={subImage}
                    onClick={() => setSelectedImage(subImage)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Product Info Section */}
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          <Typography component={'h1'} variant='h4' fontWeight="bold">
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating value={product.rate} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({product.rate})
            </Typography>
          </Box>
          
          <Typography component="p" variant='h4' color="primary" fontWeight="bold">
            ${product.price}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography component="span" variant='body1' fontWeight="bold">
              Category:
            </Typography>
            <Chip label={product.categoryName} color="primary" variant="outlined" />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography component="span" variant='body1' fontWeight="bold">
              Brand:
            </Typography>
            <Chip label={product.brandName} color="secondary" variant="outlined" />
          </Box>
          
          <Button 
            variant='contained' 
            color='primary' 
            size="large"
            sx={{ mt: 2, py: 1.5 }}
            onClick={() => addToCart(product.id)}
          >
            Add To Cart
          </Button>
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <Card sx={{ boxShadow: 5, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2" fontWeight="bold">
            Customer Reviews
          </Typography>
          <Button 
            variant="outlined" 
            color="primary"
            onClick={handleOpenReviewDialog}
          >
            Add Review
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />
        
        {product.reviews && product.reviews.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {product.reviews.map((review, index) => (
              <Box key={index} sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {review.customerName ? review.customerName.charAt(0).toUpperCase() : 'U'}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {review.fullName || 'Anonymous'}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating value={review.rate} readOnly size="small" />
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body1">
                  {review.comment}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              No reviews yet. Be the first to review this product!
            </Typography>
          
          </Box>
        )}
      </Card>

      {/* Add Review Dialog */}
      <Dialog 
        open={reviewDialogOpen} 
        onClose={handleCloseReviewDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Your Review</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Typography variant="body1">Your Rating:</Typography>
            <Rating
              value={reviewRating}
              onChange={(event, newValue) => {
                setReviewRating(newValue);
              }}
              size="large"
            />
            <TextField
              label="Your Review"
              multiline
              rows={4}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Share your experience with this product..."
              fullWidth
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReviewDialog} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleAddReview} 
            variant="contained" 
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Submit Review'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}