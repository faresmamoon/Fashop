import { 
  Box, 
  Card, 
  CardContent, 
  CircularProgress, 
  Grid, 
  Typography,
  Container,
  Chip,
  alpha,
  useTheme,
  CardActionArea,
  Stack
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import AxiosInstanse from '../../api/AxiosInstanse';
import { useTranslation } from 'react-i18next';
import { 
  ShoppingBag, 
  Category, 
  TrendingUp,
  ArrowForward
} from '@mui/icons-material';
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Categories() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { mode } = useContext(ThemeContext);

  // Theme-based styling
  const getBackgroundGradient = () => {
    return mode === 'light' 
      ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
  };

  const getTextGradient = () => {
    return mode === 'light'
      ? 'linear-gradient(45deg, #2c3e50 30%, #3498db 90%)'
      : 'linear-gradient(45deg, #ffffff 30%, #a0aec0 90%)';
  };

  const getCardShadow = () => {
    return mode === 'light'
      ? '0 8px 32px rgba(0,0,0,0.1)'
      : '0 8px 32px rgba(0,0,0,0.3)';
  };

  const getCardHoverShadow = () => {
    return mode === 'light'
      ? '0 16px 48px rgba(0,0,0,0.2)'
      : '0 16px 48px rgba(0,0,0,0.5)';
  };

  // Category colors that work in both themes
  const categoryColors = mode === 'light' ? [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
    'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
  ] : [
    'linear-gradient(135deg, #4C1D95 0%, #7E22CE 100%)',
    'linear-gradient(135deg, #831843 0%, #BE185D 100%)',
    'linear-gradient(135deg, #0E7490 0%, #0891B2 100%)',
    'linear-gradient(135deg, #047857 0%, #059669 100%)',
    'linear-gradient(135deg, #7C2D12 0%, #EA580C 100%)',
    'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
    'linear-gradient(135deg, #6B21A8 0%, #9333EA 100%)',
    'linear-gradient(135deg, #854D0E 0%, #CA8A04 100%)',
  ];

  const fetchCategories = async () => {
    const response = await AxiosInstanse.get(`/Customer/Categories`);
    return response;
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['Categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5
  })

  if (isError) return (
    <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h4" color="error" gutterBottom>
        {t('error_loading_categories')}
      </Typography>
      <Typography color="text.secondary">
        {error?.message || 'Unable to load categories'}
      </Typography>
    </Container>
  )

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh" flexDirection="column">
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" sx={{ mt: 3, color: 'text.secondary' }}>
        Loading categories...
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
            {t("Categories")}
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
            Explore our wide range of product categories
          </Typography>
          <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="center" 
            flexWrap="wrap"
            sx={{ gap: { xs: 1, sm: 2 } }}
          >
            <Chip 
              icon={<Category />} 
              label={`${data.data.length} Categories`} 
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
            <Chip 
              icon={<TrendingUp />} 
              label="Popular Collections" 
              color="secondary" 
              variant="outlined"
              sx={{
                backgroundColor: mode === 'light' 
                  ? alpha(theme.palette.secondary.main, 0.1)
                  : alpha(theme.palette.secondary.main, 0.2),
                borderColor: mode === 'light'
                  ? alpha(theme.palette.secondary.main, 0.3)
                  : alpha(theme.palette.secondary.main, 0.5)
              }}
            />
          </Stack>
        </Box>

        {/* Categories Grid */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {data.data.map((category, index) => (
            <Grid key={category.id} item xs={12} sm={6} md={4} lg={3}>
              <Card 
                sx={{
                  boxShadow: getCardShadow(),
                  borderRadius: { xs: 2, md: 4 },
                  overflow: 'hidden',
                  background: categoryColors[index % categoryColors.length],
                  transition: 'all 0.3s ease-in-out',
                  transform: 'translateY(0)',
                  position: 'relative',
                  height: '100%',
                  minHeight: { xs: 160, sm: 180, md: 200 },
                  '&:hover': {
                    transform: { xs: 'translateY(-4px)', md: 'translateY(-8px)' },
                    boxShadow: getCardHoverShadow(),
                    '& .category-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                    '& .category-arrow': {
                      transform: 'translateX(4px)',
                    }
                  }
                }}
              >
                <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ 
                    p: { xs: 2, md: 4 }, 
                    textAlign: 'center',
                    color: 'white',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 2,
                    flexGrow: 1
                  }}>
                    {/* Category Icon */}
                    <Box
                      className="category-icon"
                      sx={{
                        width: { xs: 50, md: 70 },
                        height: { xs: 50, md: 70 },
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: { xs: 1, md: 2 },
                        transition: 'transform 0.3s ease',
                        border: '2px solid rgba(255,255,255,0.3)'
                      }}
                    >
                      <ShoppingBag sx={{ 
                        fontSize: { xs: 20, md: 32 }, 
                        color: 'white' 
                      }} />
                    </Box>

                    {/* Category Name */}
                    <Typography 
                      variant="h5" 
                      component="h3"
                      fontWeight="bold"
                      gutterBottom
                      sx={{
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                        lineHeight: 1.3,
                        mb: { xs: 0.5, md: 1 }
                      }}
                    >
                      {category.name}
                    </Typography>

                    {/* Category Description */}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: { xs: 1, md: 2 },
                        opacity: 0.9,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                        lineHeight: 1.4
                      }}
                    >
                      {category.description || `Explore our ${category.name.toLowerCase()} collection`}
                    </Typography>

                    {/* Explore Button */}
                    <Box
                      className="category-arrow"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        px: { xs: 1.5, md: 2 },
                        py: { xs: 0.5, md: 1 },
                        borderRadius: 3,
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        border: '1px solid rgba(255,255,255,0.3)',
                        marginTop: 'auto'
                      }}
                    >
                      {t('Explore')}
                      <ArrowForward fontSize="small" />
                    </Box>
                  </CardContent>

                  {/* Overlay for better text readability */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
                      zIndex: 1
                    }}
                  />
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
            <Category sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
            <Typography variant="h5" gutterBottom>
              No Categories Available
            </Typography>
            <Typography variant="body1">
              Check back later for new category additions.
            </Typography>
          </Box>
        )}

        {/* Footer Section */}
        <Box sx={{ 
          textAlign: 'center', 
          mt: { xs: 4, md: 8 }, 
          pt: { xs: 2, md: 4 },
          borderTop: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`
        }}>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ mb: 1, fontStyle: 'italic' }}
          >
            "Everything you need in one place"
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse through our categories to find exactly what you're looking for
          </Typography>
        </Box>
      </Container>
    </Box>
  )  
}