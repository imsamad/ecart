import React from 'react';
import ProductDetails from './ProductDetails';
import ShippingDetails from './ShippingDetails';
import PaymentDetails from './PaymentDetails';
import { Grid, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import StepBtn from '../StepBtn';
export default function ReviewOrder({ handleNext, handleBack }) {
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );
  return (
    <Grid container>
      <Grid
        item
        sx={12}
        md={8}
        sx={{
          m: 'auto',
        }}
      >
        <Paper
          elevation={2}
          sx={{ border: 2, borderRadius: 4, borderColor: 'grey.400', p: 2 }}
        >
          <Typography variant="h6" gutterBottom align="center">
            Order summary
          </Typography>
          <Grid container rowSpacing={4} columnSpacing={2}>
            <Grid item xs={12}>
              <ProductDetails cartItems={cartItems} />
            </Grid>

            <Grid item xs={6}>
              <ShippingDetails shippingAddress={shippingAddress} />
            </Grid>
            <Grid item xs={6}>
              <PaymentDetails paymentMethod={paymentMethod} />
            </Grid>
          </Grid>
          <StepBtn handleNext={handleNext} handleBack={handleBack} fromReview />
        </Paper>
      </Grid>
    </Grid>
  );
}
