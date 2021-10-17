import React from 'react';
import ProductDetails from './ProductDetails';
import ShippingDetails from './ShippingDetails';
import PaymentDetails from './PaymentDetails';
import { Grid, Paper, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import StepBtn from '../StepBtn';
export default function ReviewOrder({ handleNext, handleBack }) {
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );
  return (
    <Box>
      <Paper
        elevation={2}
        sx={{ border: 2, borderRadius: 4, borderColor: 'grey.400', p: 2 }}
      >
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
    </Box>
  );
}
