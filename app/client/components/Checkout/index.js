import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import ReviewOrder from "./ReviewOrder";
import CartReview from "./CartReview";
import EmptyCart from "../EmptyCart";

const steps = [
  "Select a delivery address",
  "Select Pay Option",
  "Select Product",
  "Review Order",
];

export default function index() {
  const { cartItems } = useSelector((state) => state.cart);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlers = { handleNext, handleBack };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={10}
        sx={{
          m: "auto",
          border: 1,
          borderColor: "grey.400",
          p: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center">
          Checkout
        </Typography>
        {cartItems.length === 0 ? (
          <EmptyCart />
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
                <StepContent>{renderComponent(index, handlers)}</StepContent>
              </Step>
            ))}
          </Stepper>
        )}
      </Grid>
    </Grid>
  );
}
function renderComponent(index, { handleNext, handleBack }) {
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
}
