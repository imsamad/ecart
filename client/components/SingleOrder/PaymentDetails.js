import React from 'react';
import { Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

function PaymentDetails() {
  const { paymentMethod, isPaid, paidAt } = useSelector(
    ({ orderPay }) => orderPay
  );
  let payMeth = paymentMethod === 'pod' ? 'Pay on Delivery' : 'PayPal';
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment details :-
      </Typography>
      <Grid container>
        {isPaid && (
          <>
            <Grid item xs={6}>
              <Typography gutterBottom>Paid At</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{paidAt}</Typography>
            </Grid>
          </>
        )}
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
