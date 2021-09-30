import React from 'react';
import { Typography, Grid } from '@mui/material';

function PaymentDetails() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment details
      </Typography>
      <Grid container>
        <React.Fragment>
          <Grid item xs={6}>
            <Typography gutterBottom>Payment type</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Pay on Delivery</Typography>
          </Grid>
        </React.Fragment>
      </Grid>
    </>
  );
}

export default PaymentDetails;
