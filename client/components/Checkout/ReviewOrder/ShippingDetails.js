import React from 'react';
import { Typography, Box } from '@mui/material';

function ShippingDetails({
  shippingAddress: {
    city,
    country,
    landmark,
    fullName,
    mobileNo,
    pinCode,
    state,
  },
}) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping To
      </Typography>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: '700' }}>
          {fullName}
        </Typography>
        <Typography gutterBottom>{mobileNo},</Typography>
        <Typography gutterBottom>{landmark},</Typography>
        <Typography gutterBottom>
          {city}
          {'  '}
          {pinCode},
        </Typography>
        <Typography gutterBottom>
          {state}
          {'  '},{country}
        </Typography>
      </Box>
    </>
  );
}

export default ShippingDetails;
