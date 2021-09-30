import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';

import AddressForm from './Forms/AddressForm';
import PaymentForm from './Forms/PaymentForm';
import SelectProducts from './SelectProducts';
import ReviewOrder from './ReviewOrder';

const steps = [
  'Select a delivery address',
  'Select Pay Option',
  'Select Product',
  'Review Order',
];

export default function VerticalLinearStepper() {
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
        return (
          <SelectProducts
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
          />
        );
      case 3:
        return <ReviewOrder handleNext={handleNext} handleBack={handleBack} />;
      default:
        null;
    }
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" align="center">
        Buy
      </Typography>
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
            <StepContent sx={{ width: '100%' }}>
              {renderComponent(index)}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
