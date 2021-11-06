import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Box } from '@mui/system';

import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import ReviewOrder from './ReviewOrder';
import CartReview from './CartReview';
import { Button } from '@mui/material';

const steps = [
  'Select a delivery address',
  'Select Pay Option',
  'Select Product',
  'Review Order',
];

export default function VerticalLinearStepper() {
  const { cartItems } = useSelector((state) => state.cart);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderComponent = (index) => {
    switch (index) {
      case 0:
        return <AddressForm handleNext={handleNext} />;
      case 1:
        return <PaymentForm handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return <CartReview handleBack={handleBack} handleNext={handleNext} />;
      case 3:
        return <ReviewOrder handleNext={handleNext} handleBack={handleBack} />;
      default:
        null;
    }
  };
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={10}
        sx={{
          m: 'auto',
          border: 1,
          borderColor: 'grey.400',
          p: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center">
          Checkout
        </Typography>
        {cartItems.length === 0 ? (
          <Box
            sx={{
              maxWidth: 'sm',
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" align="center" gutterBottom>
              Your Cart Is Empty
            </Typography>
            <Link href="/">
              <Button
                color="info"
                variant="contained"
                size="small"
                disableElevation
              >
                Back To Shopping
              </Button>
            </Link>
          </Box>
        ) : (
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step}>
                <StepLabel
                  optional={
                    index === steps.length - 1 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  {step}
                </StepLabel>
                <StepContent>{renderComponent(index)}</StepContent>
              </Step>
            ))}
          </Stepper>
        )}
      </Grid>
    </Grid>
  );
}
