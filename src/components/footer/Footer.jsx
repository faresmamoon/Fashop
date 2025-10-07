import { Box, Button, Container,  Divider,  Typography } from '@mui/material'
import {  IconButton } from "@mui/material";
import { Instagram, Pinterest, Twitter, Email } from "@mui/icons-material";
import { Phone, LocationOn } from "@mui/icons-material";
import { useTranslation } from 'react-i18next';



export default function Footer() {
    const { t } = useTranslation();
  
  return (
   <>
   <Container maxWidth='xl'   sx={{ color:  "white",bgcolor: 'black' }}>
   <Box display={'flex'}  flexDirection={{ xs: "column", sm: "column", md:"column" ,lg:"row" }} justifyContent={'space-between'} gap={7} py={7}>
<Box display={'flex'} flexDirection="column"  justifyContent={'flex-start'} alignItems={'flex-start'} >
   <Typography variant={'h3'} p={3}>{t('Follow Us')}</Typography>
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
<Box display={'flex'} flexDirection="column" gap={3} justifyContent={'flex-start'} alignItems={'flex-start'} >
<Typography variant={'h4'} >{t('Our Product')}</Typography>
  <Typography variant={'body1'}  >{t('All Products')}</Typography>
    <Typography variant={'body1'}  >{t('Laptops')}</Typography>
    <Typography variant={'body1'} >{t('Headphones')}</Typography>
    <Typography variant={'body1'} >{t('Smartphones')}</Typography>
    



</Box>
<Box display={'flex'} flexDirection="column" gap={3} justifyContent={'flex-start'} alignItems={'flex-start'} >
<Typography variant={'h4'} >{t('Links')}</Typography>
  <Typography variant={'body1'}  >{t('Terms & Conditions')}</Typography>
    <Typography variant={'body1'}  >{t('Privacy Policy')}</Typography>
    <Typography variant={'body1'} >{t('Refund & Return Policy')}</Typography>

</Box>
<Box display={'flex'} flexDirection="column" gap={3} justifyContent={'flex-start'} alignItems={'flex-start'} >
<Typography variant={'h4'} >{t('Site Pages')}</Typography>
  <Typography variant={'body1'}  >{t('Homepage')}</Typography>
    <Typography variant={'body1'}  >{t('About FA Store')}</Typography>
    <Typography variant={'body1'} >{t('Shop')}</Typography>
    <Typography variant={'body1'} >{t('Contact Us')}</Typography>
    

</Box>
   </Box>
    <Divider  textAlign='center'sx={{   borderColor: "white",}}></Divider>
      <Box display={'flex'}  flexDirection={{ xs: "column", sm: "column", md:"column" ,lg:"row" }} gap={3} py={3} justifyContent={'space-between'}>
        <Box  display={'flex'}  flexDirection={{ xs: "column", sm: "column", md:"column" ,lg:"row" }} gap={3} >
        <Box display={'flex'} flexDirection="column" gap={3} justifyContent={'center'} alignItems={'flex-start'} >
   <Typography component={'h2'}>{t('Sunday to Thursday')}</Typography>
   <Typography component={'h2'}>09 AM — 07 PM</Typography> 
      </Box>
      <Box 
      sx={{
        display: "flex", 
        gap: 2,
        justifyContent: "flex-start",
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
<Typography component={'h2'}>FA Store © 2025 | All Rights Reserved</Typography>
      </Box>
   </Box>
 </Container>
   </>
  )
}
