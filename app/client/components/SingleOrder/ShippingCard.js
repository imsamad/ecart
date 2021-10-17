import React from 'react';
import { Typography, Box } from '@mui/material';

function ShippingDetails({
  order: {
    address: { pinCode, country, fullName, mobileNo, landmark, city, state },
    deliveredAt,
    isDelivered,
  },
}) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {isDelivered ? 'Shipped To' : 'Shipping To'}
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
        {isDelivered && (
          <Typography variant="h6" sx={{ fontWeight: '700' }}>
            {deliveredAt}
          </Typography>
        )}
      </Box>
      {/* <Typography gutterBottom>{`${firstName} ${lastName}`}</Typography>
      <Typography gutterBottom>{`${address1}`}</Typography>
    */}
    </>
  );
}

export default ShippingDetails;
