import React from 'react';
import { Typography, Grid, Box } from '@mui/material';

function ShippingDetails(props) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping
      </Typography>
      <Address />
      {/* <Typography gutterBottom>{`${firstName} ${lastName}`}</Typography>
      <Typography gutterBottom>{`${address1}`}</Typography>
    */}
    </>
  );
}

export default ShippingDetails;
const Address = () => (
  <Box>
    <Typography variant="h6" sx={{ fontWeight: '700' }}>
      Abdus Samad
    </Typography>
    <Typography gutterBottom>Raipur,Gagalehri road</Typography>
    <Typography gutterBottom>Before Jagdamba Indian Petrol Pump</Typography>
    <Typography gutterBottom>BHAGWANPUR, UTTARAKHAND</Typography>
    <Typography gutterBottom>247661</Typography>
    <Typography gutterBottom>INDIA</Typography>
  </Box>
);
