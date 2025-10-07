import { 
  Box, 
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  CircularProgress, 
  Grid, 
  Typography,
  Container,
  Chip,
  alpha,
  useTheme
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import AxiosInstanse from "../../api/AxiosInstanse";
import { useTranslation } from "react-i18next";
import { Star, ShoppingBag, TrendingUp } from "@mui/icons-material";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Brands() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { mode } = useContext(ThemeContext);

  // Theme-based colors
  const getBackgroundGradient = () => {
    return mode === 'light' 
      ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
  };

  const getCardBackground = () => {
    return mode === 'light'
      ? 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
      : 'linear-gradient(145deg, #2d3748 0%, #4a5568 100%)';
  };

  const getTextGradient = () => {
    return mode === 'light'
      ? 'linear-gradient(45deg, #2c3e50 30%, #3498db 90%)'
      : 'linear-gradient(45deg, #ffffff 30%, #a0aec0 90%)';
  };

  const getCardHoverShadow = () => {
    return mode === 'light'
      ? '0 16px 48px rgba(0,0,0,0.15)'
      : '0 16px 48px rgba(0,0,0,0.4)';
  };

  const fetchBrands = async () => {
    const response = await AxiosInstanse.get(`/Customer/Brands`);
    return response;
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
    staleTime: 1000 * 60 * 5
  })

  if (isError) return (
    <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h4" color="error" gutterBottom>
        {t('error_loading_brands')}
      </Typography>
      <Typography color="text.secondary">
        {error?.message || 'Unable to load brands'}
      </Typography>
    </Container>
  )

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" sx={{ mt: 3, ml: 2, color: 'text.secondary' }}>
        Loading brands...
      </Typography>
    </Box>
  )

  return (
    <Box sx={{ 
      py: { xs: 4, md: 8 },
      background: getBackgroundGradient(),
      minHeight: '100vh',
      transition: 'background 0.3s ease-in-out'
    }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: { xs: 4, md: 8 },
          px: { xs: 2, sm: 0 }
        }}>
          <Typography 
            variant="h2" 
            component="h1" 
            fontWeight="bold" 
            gutterBottom
            sx={{
              background: getTextGradient(),
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2
            }}
          >
            {t("Brands")}
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 600, 
              mx: 'auto', 
              mb: 2,
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            Discover premium brands and exclusive collections
          </Typography>
          <Chip 
            icon={<TrendingUp />} 
            label={`${data.data.length} Brands Available`} 
            color="primary" 
            variant="outlined"
            sx={{
              backgroundColor: mode === 'light' 
                ? alpha(theme.palette.primary.main, 0.1)
                : alpha(theme.palette.primary.main, 0.2),
              borderColor: mode === 'light'
                ? alpha(theme.palette.primary.main, 0.3)
                : alpha(theme.palette.primary.main, 0.5)
            }}
          />
        </Box>

        {/* Brands Grid */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {data.data.map((brand) => (
            <Grid key={brand.id} item xs={12} sm={6} md={4} lg={3}>
              <Card 
                sx={{
                  boxShadow: mode === 'light' 
                    ? '0 8px 32px rgba(0,0,0,0.1)'
                    : '0 8px 32px rgba(0,0,0,0.3)',
                  borderRadius: { xs: 2, md: 4 },
                  overflow: 'hidden',
                  background: getCardBackground(),
                  border: mode === 'light'
                    ? '1px solid rgba(255,255,255,0.2)'
                    : '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease-in-out',
                  height: '100%',
                  '&:hover': {
                    transform: { xs: 'translateY(-4px)', md: 'translateY(-8px)' },
                    boxShadow: getCardHoverShadow(),
                  }
                }}
              >
                <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ position: 'relative', width: '100%' }}>
                    <CardMedia 
                      alt={brand.name}
                      sx={{
                        height: { xs: 150, sm: 180, md: 200 },
                        p: { xs: 2, md: 3 },
                        objectFit: 'contain',
                        background: mode === 'light'
                          ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`
                          : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                      }}
                      component='img'
                      image={brand.mainImageUrl}
                      onError={(e) => {
                        e.target.src = '/api/placeholder/300/200'; // Fallback image
                      }}
                    />
                    
                    {/* Premium Badge */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: { xs: 8, md: 12 },
                        right: { xs: 8, md: 12 },
                        background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                        borderRadius: '50%',
                        width: { xs: 32, md: 40 },
                        height: { xs: 32, md: 40 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(255,215,0,0.3)',
                        zIndex: 2
                      }}
                    >
                      <Star sx={{ 
                        color: 'white', 
                        fontSize: { xs: 16, md: 20 } 
                      }} />
                    </Box>
                  </Box>

                  <CardContent sx={{ 
                    p: { xs: 2, md: 3 }, 
                    textAlign: 'center',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <Box>
                      {/* Brand Name */}
                      <Typography 
                        variant="h6" 
                        component="h3"
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                          background: getTextGradient(),
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          color: 'transparent',
                          fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                          lineHeight: 1.3,
                          minHeight: { xs: '3rem', md: 'auto' },
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {brand.name}
                      </Typography>

                      {/* Brand Description */}
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          fontSize: { xs: '0.875rem', md: '1rem' },
                          lineHeight: 1.5
                        }}
                      >
                        {brand.description || 'Premium quality products and exceptional service'}
                      </Typography>
                    </Box>

                    {/* Explore Button */}
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: { xs: 1.5, md: 2 },
                        py: { xs: 0.75, md: 1 },
                        borderRadius: 3,
                        background: mode === 'light'
                          ? alpha(theme.palette.primary.main, 0.1)
                          : alpha(theme.palette.primary.main, 0.2),
                        color: theme.palette.primary.main,
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                        fontWeight: 'bold',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          background: mode === 'light'
                            ? alpha(theme.palette.primary.main, 0.2)
                            : alpha(theme.palette.primary.main, 0.3),
                          transform: 'scale(1.05)'
                        },
                        marginTop: 'auto'
                      }}
                    >
                      <ShoppingBag fontSize="small" />
                      {t('Explore')}
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {data.data.length === 0 && (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            color: 'text.secondary'
          }}>
            <ShoppingBag sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
            <Typography variant="h5" gutterBottom>
              No Brands Available
            </Typography>
            <Typography variant="body1">
              Check back later for new brand additions.
            </Typography>
          </Box>
        )}

        {/* Loading more indicator */}
        {isLoading && data.data.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress size={40} />
          </Box>
        )}
      </Container>
    </Box>
  )
}