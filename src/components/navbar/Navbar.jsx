import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
  Chip,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import AxiosUserInstanse from "../../api/AxiosUserInstanse";
import { useQuery } from "@tanstack/react-query";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const { mode, togglenTheme } = useContext(ThemeContext);
  const [lang, setLang] = useState(i18next.language);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const fetchProfile = async () => {
    try {
      const response = await AxiosUserInstanse.get("/Users/profile");
      return response;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  };

  const { data: user } = useQuery({
    queryKey: ["User"],
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5,
    enabled: isLoggedIn, // Only fetch if logged in
  });

  const fetchCartItems = async () => {
    try {
      const response = await AxiosUserInstanse.get("/Customer/Carts");
      console.log("Cart API Response:", response.data); // Debug log
      return response;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      // Return empty cart structure if API fails
      return { data: { items: [] } };
    }
  };

  const { data: cartData, isLoading: cartLoading } = useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchCartItems,
    staleTime: 1000 * 60 * 5,
    enabled: isLoggedIn, // Only fetch cart if user is logged in
    refetchOnWindowFocus: true, // Refresh cart when window gains focus
  });

  // Safely get cart item count
  const cartItemCount = React.useMemo(() => {
    if (!isLoggedIn) return 0;
    if (cartLoading) return 0;
    
    const items = cartData?.data?.items;
    console.log("Cart items:", items); // Debug log
    
    if (!items || !Array.isArray(items)) return 0;
    
    // Calculate total quantity from all items
    const totalCount = items.reduce((total, item) => {
      return total + (item.count || 1); // Use item.count if available, otherwise assume 1
    }, 0);
    
    return totalCount;
  }, [cartData, isLoggedIn, cartLoading]);

  const toggleLanguage = (newLang) => {
    i18next.changeLanguage(newLang).then(() => {
      setLang(newLang);
      document.documentElement.dir = i18next.dir();
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const pages = [
    { name: t("Home"), link: "/" },
    { name: t("Products"), link: "/products" },
  ];

  // Cart button component to avoid repetition
  const CartButton = ({ mobile = false }) => (
    <Button
      component={RouterLink}
      to="/cart"
      sx={{ 
        color: "white",
        fontWeight: 600,
        px: mobile ? 1 : 2,
        py: 1,
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.1)',
          transform: mobile ? 'none' : 'translateY(-2px)',
        },
        minWidth: mobile ? 'auto' : '120px'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ShoppingCartIcon fontSize={mobile ? "small" : "medium"} />
        {!mobile && <Typography variant="body2">{t("Cart")}</Typography>}
        {cartItemCount > 0 && (
          <Chip 
            label={cartItemCount} 
            size="small" 
            sx={{ 
              backgroundColor: '#FFD700', 
              color: '#8B4513',
              fontWeight: 'bold',
              height: 20,
              minWidth: 20,
              fontSize: '0.7rem'
            }} 
          />
        )}
      </Box>
    </Button>
  );

  return (
    <AppBar 
      position="sticky" 
      sx={{
        background: mode === 'light' 
          ? 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)'
          : 'linear-gradient(135deg, #654321 0%, #8B4513 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", py: 1 }}>
         
          {/* Logo */}
          <Typography
            variant="h4"
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 800,
              textDecoration: "none",
              mr: 2,
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            🛍️ FA Shop
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleOpenNavMenu}
              sx={{
                border: '1px solid rgba(255,255,255,0.3)',
                backgroundColor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
              PaperProps={{
                sx: {
                  width: '100vw',
                  left: 0,
                  m: 0,
                  borderRadius: 0,
                  background: mode === 'light' 
                    ? 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)'
                    : 'linear-gradient(135deg, #654321 0%, #8B4513 100%)',
                  color: 'white',
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page.link}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    }
                  }}
                >
                  <Typography sx={{ fontWeight: 500 }}>{page.name}</Typography>
                </MenuItem>
              ))}
              {isLoggedIn ? (
                <>
                  <MenuItem 
                    component={RouterLink}  
                    to="/cart" 
                    onClick={handleCloseNavMenu}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ShoppingCartIcon fontSize="small" />
                      <Typography>{t("Cart")}</Typography>
                      {cartItemCount > 0 && (
                        <Chip 
                          label={cartItemCount} 
                          size="small" 
                          sx={{ 
                            backgroundColor: '#FFD700', 
                            color: '#8B4513',
                            fontWeight: 'bold',
                            height: 20,
                            minWidth: 20
                          }} 
                        />
                      )}
                    </Box>
                  </MenuItem>
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      }
                    }}
                  >
                    <Typography>{t("Logout")}</Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem 
                    component={RouterLink} 
                    to="/login"  
                    onClick={handleCloseNavMenu}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      }
                    }}
                  >
                    <Typography>{t("Login")}</Typography>
                  </MenuItem>
                  <MenuItem 
                    component={RouterLink} 
                    to="/register"  
                    onClick={handleCloseNavMenu}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      }
                    }}
                  >
                    <Typography>{t("Register")}</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ 
            display: { xs: "none", md: "flex" }, 
            gap: 1,
            alignItems: 'center'
          }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.link}
                sx={{ 
                  color: "white",
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                {page.name}
              </Button>
            ))}

            {isLoggedIn && <CartButton />}
          </Box>

          {/* Right Side Actions */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 1 
          }}>
            {/* Theme Toggle */}
            <Tooltip title={mode === "light" ? t("Dark Mode") : t("Light Mode")}>
              <IconButton 
                onClick={togglenTheme} 
                color="inherit"
                sx={{
                  border: '1px solid rgba(255,255,255,0.3)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>

            {/* Language Toggle */}
            <Button
              onClick={() =>
                toggleLanguage(i18next.language === "en" ? "ar" : "en")
              }
              sx={{ 
                color: "white",
                fontWeight: 600,
                px: 2,
                py: 1,
                borderRadius: 2,
                border: '1px solid rgba(255,255,255,0.3)',
                backgroundColor: 'rgba(255,255,255,0.1)',
                minWidth: 'auto',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              {i18next.language === "en" ? "العربية" : "English"}
            </Button>

            {/* User Menu */}
            {isLoggedIn && (
              <Tooltip title={t("Profile")}>
                <Box>
                  <Button
                    onClick={handleOpenUserMenu}
                    sx={{ 
                      textTransform: "none", 
                      color: "white",
                      fontWeight: 600,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      border: '1px solid rgba(255,255,255,0.3)',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.2)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                    startIcon={<PersonIcon />}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    {user?.data?.fullName?.split(' ')[0] || "User"}
                  </Button>
                </Box>
              </Tooltip>
            )}

            {/* Login/Register for non-logged in users */}
            {!isLoggedIn && (
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                <Button
                  component={RouterLink}
                  to="/login"
                  sx={{ 
                    color: "white",
                    fontWeight: 600,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    border: '1px solid rgba(255,255,255,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {t("Login")}
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  sx={{ 
                    color: "#8B4513",
                    fontWeight: 600,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor: '#FFD700',
                    '&:hover': {
                      backgroundColor: '#FFC400',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {t("Register")}
                </Button>
              </Box>
            )}

            {/* User Dropdown Menu */}
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{ mt: '45px' }}
              PaperProps={{
                sx: {
                  background: mode === 'light' 
                    ? 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)'
                    : 'linear-gradient(135deg, #654321 0%, #8B4513 100%)',
                  color: 'white',
                  borderRadius: 2,
                  minWidth: 200,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                },
              }}
            >
              <MenuItem 
                component={RouterLink} 
                to="/profile"  
                onClick={handleCloseUserMenu}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                👤 {t("Profile")}
              </MenuItem>
              <MenuItem 
                component={RouterLink} 
                to="/profile/orders"  
                onClick={handleCloseUserMenu}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                📦 {t("Orders")}
              </MenuItem>
              <MenuItem 
                onClick={handleLogout}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255,215,0,0.2)',
                  }
                }}
              >
                🚪 {t("Logout")}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}