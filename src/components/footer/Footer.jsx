import { Box, Button, Container,  Divider,  Typography } from '@mui/material'
import {  IconButton } from "@mui/material";
import { Instagram, Pinterest, Twitter, Email } from "@mui/icons-material";
import { Phone, LocationOn } from "@mui/icons-material";



export default function Footer() {
  return (
   <>
   <Container maxWidth='xl'   sx={{ color:  "white",bgcolor: 'black' }}>
   <Box display={'flex'}  flexDirection={{ xs: "column", sm: "column", md:"column" ,lg:"row" }} justifyContent={'space-between'} gap={7} py={7}>
<Box display={'flex'} flexDirection="column" gap={3} justifyContent={'flex-start'} alignItems={'center'} >
   <Typography component={'h2'}>Follow Us</Typography>
 <Box sx={{ display: "flex", gap: 2, justifyContent: "center", p: 3 }}>
      {[Instagram, Pinterest, Twitter, Email].map((Icon, i) => (
        <IconButton
          key={i}
          sx={{
            border: 1,
            borderColor: "cyan",
            color: "cyan",
            borderRadius: "50%",
            width: 55,
            height: 55,
          }}
        >
          <Icon />
        </IconButton>
      ))} 
    </Box>
</Box>
<Box display={'flex'} flexDirection="column" gap={3} justifyContent={'flex-start'} alignItems={'center'} >
<Typography variant={'h4'} >Our Product</Typography>
  <Typography variant={'body1'}  >All Products</Typography>
    <Typography variant={'body1'}  >Laptops</Typography>
    <Typography variant={'body1'} >Headphones</Typography>
    <Typography variant={'body1'} >Smartphones</Typography>
    <Typography variant={'body1'} >PlayStation</Typography>
    <Typography variant={'body1'} >Smartwatch</Typography>



</Box>
<Box display={'flex'} flexDirection="column" gap={3} justifyContent={'flex-start'} alignItems={'center'} >
<Typography variant={'h4'} >Links</Typography>
  <Typography variant={'body1'}  >Terms & Conditions</Typography>
    <Typography variant={'body1'}  >Privacy Policy</Typography>
    <Typography variant={'body1'} >Refund & Return Policy</Typography>

</Box>
<Box display={'flex'} flexDirection="column" gap={3} justifyContent={'flex-start'} alignItems={'center'} >
<Typography variant={'h4'} >Site Pages</Typography>
  <Typography variant={'body1'}  >Homepage</Typography>
    <Typography variant={'body1'}  >About KA Store</Typography>
    <Typography variant={'body1'} >Shop</Typography>
    <Typography variant={'body1'} >Contact Us</Typography>
    

</Box>
   </Box>
    <Divider  textAlign='center'sx={{   borderColor: "white",}}></Divider>
      <Box display={'flex'}  flexDirection={{ xs: "column", sm: "column", md:"column" ,lg:"row" }} gap={3} py={3} justifyContent={'space-between'}>
        <Box  display={'flex'}  flexDirection={{ xs: "column", sm: "column", md:"column" ,lg:"row" }} gap={3} >
        <Box display={'flex'} flexDirection="column" gap={3} justifyContent={'center'} alignItems={'center'} >
   <Typography component={'h2'}>Sunday to Thursday</Typography>
   <Typography component={'h2'}>09 AM — 07 PM</Typography> 
      </Box>
      <Box 
      sx={{
        display: "flex", 
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      {/* Phone */}
      <IconButton
        sx={{
          border: 1,
          borderColor: "cyan",
          color: "cyan",
          borderRadius: "50%",
          width: 50,
          height: 50,
        }}
      >
        <Phone />
      </IconButton>

      {/* Email */}
      <IconButton
        sx={{
          border: 1,
          borderColor: "cyan",
          color: "cyan",
          borderRadius: "50%",
          width: 50,
          height: 50,
        }}
      >
        <Email />
      </IconButton>

      {/* Location */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2.5,
          py: 1,
          border: 1,
          borderColor: "cyan",
          borderRadius: "50px",
          color: "cyan",
        }}
      >
        <LocationOn />
        <Typography>Location</Typography>
      </Box>
    </Box>

      </Box>
      
      <Box >
<Typography component={'h2'}>KA Store © 2025 | All Rights Reserved</Typography>
      </Box>
   </Box>
 </Container>
   </>
  )
}
