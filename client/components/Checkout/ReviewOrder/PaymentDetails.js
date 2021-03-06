import React from 'react';
import { Typography, Grid } from '@mui/material';

function PaymentDetails({ paymentMethod }) {
  let payMeth = 'PayPal';
  if (payMeth === 'pod') payMeth = 'Pay On Delivery';

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment details :-
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Typography gutterBottom>Payment type</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>{payMeth}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PaymentDetails;
