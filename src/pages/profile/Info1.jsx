import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import { 
  Box, 
  CircularProgress, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  Container,
  Grid,
  Chip,
  Divider,
  Paper,
  Stack,
  alpha,
  useTheme
} from '@mui/material';
import { 
  Person, 
  Email, 
  Phone, 
  CalendarToday, 
  VerifiedUser,
  Edit,
  LocationOn,
  Security
} from '@mui/icons-material';

export default function Info() {
  const queryClient = useQueryClient();
  const theme = useTheme();

  const fetchProfile = async () => {
    const response = await AxiosUserInstanse.get('/Users/Profile');
    return response;
  }

  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['User'],
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5
  });

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh" flexDirection="column">
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" sx={{ mt: 3, color: 'text.secondary' }}>
        Loading your profile...
      </Typography>
    </Box>
  );

  if (isError) return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h4" color="error" gutterBottom>
        Error Loading Profile
      </Typography>
      <Typography color="text.secondary">
        {error?.message || 'Unable to load user profile'}
      </Typography>
    </Container>
  );

  const userData = user?.data;

  return (
    <Box sx={{ 
      py: 8, 
      background: 'linear-gradient(135deg, #93f7b1ff 0%, #764ba2 100%)',
      minHeight: '100vh'
      
    }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            fontWeight="bold" 
            gutterBottom
            sx={{
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontSize: { xs: '2.5rem', md: '3rem' }
            }}
          >
            My Profile
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Manage your personal information and account settings
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent={'center'}>
          {/* Profile Overview Card */}
          <Grid item xs={12} md={4} >
            <Card  
              sx={{ 
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                {/* Avatar Section */}
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      backgroundColor: theme.palette.primary.main,
                      fontSize: '2.5rem',
                      fontWeight: 'bold',
                      border: '4px solid white',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                    }}
                  >
                    {userData?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                  </Avatar>
                  <Chip
                    icon={<VerifiedUser />}
                    label="Verified"
                    color="success"
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: -10,
                      fontWeight: 'bold'
                    }}
                  />
                </Box>

                {/* User Name */}
                <Typography 
                  variant="h4" 
                  component="h2" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{
                    background: 'linear-gradient(45deg, #2c3e50, #3498db)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  {userData?.fullName || 'User Name'}
                </Typography>

                {/* Member Status */}
                <Chip
                  label="Premium Member"
                  color="primary"
                  variant="filled"
                  sx={{ mb: 3, fontWeight: 'bold' }}
                />

                <Divider sx={{ my: 3 }} />

                {/* Quick Stats */}
                <Stack spacing={2} sx={{ textAlign: 'left' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarToday color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Member Since
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {new Date().getFullYear()}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Security color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Account Status
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" color="success.main">
                        Active
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Detailed Information Card */}
          <Grid item xs={12} md={8}>
            <Card 
              sx={{ 
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                height: '100%'
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                  <Typography 
                    variant="h4" 
                    component="h2" 
                    fontWeight="bold"
                    sx={{
                      background: 'linear-gradient(45deg, #2c3e50, #3498db)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    Personal Information
                  </Typography>
                  <Chip
                    icon={<Edit />}
                    label="Edit Profile"
                    color="primary"
                    variant="outlined"
                    clickable
                  />
                </Box>

                <Stack spacing={4}>
                  {/* Personal Details Section */}
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 3,
                      background: alpha(theme.palette.primary.main, 0.03)
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                      Contact Information
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Person color="primary" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Full Name
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                              {userData?.fullName || 'Not provided'}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Email color="primary" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Email Address
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                              {userData?.email || 'Not provided'}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Phone color="primary" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Phone Number
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" color="text.secondary">
                              {userData?.phoneNumber || 'Not provided'}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <LocationOn color="primary" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Location
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" color="text.secondary">
                              {userData?.address || 'Not provided'}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Account Details Section */}
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 3,
                      background: alpha(theme.palette.secondary.main, 0.03)
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="secondary">
                      Account Details
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <VerifiedUser color="secondary" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Account Type
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                              Premium User
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <CalendarToday color="secondary" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Last Login
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                              Recently
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Additional Info Section */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper 
              sx={{ 
                p: 3, 
                borderRadius: 3, 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                12
              </Typography>
              <Typography variant="body2">
                Orders Completed
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              sx={{ 
                p: 3, 
                borderRadius: 3, 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white'
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                5
              </Typography>
              <Typography variant="body2">
                Wishlist Items
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              sx={{ 
                p: 3, 
                borderRadius: 3, 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white'
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                3
              </Typography>
              <Typography variant="body2">
                Active Reviews
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}