import {
  Button,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  FormControlLabel,
} from "@mui/material";
import * as Yup from "yup";
import React from "react";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { addPaymentMethod } from "../../../redux/actions/cartActions";

const payOptions = [
  { label: "Pay On Delivery", value: "pod", disabled: true },
  { label: "Stripe", value: "stripe", disabled: true },
  { label: "PayPal", value: "payPal", disabled: false },
  { label: "PayTM", value: "payTm", disabled: true },
];

const index = ({ handleNext, handleBack }) => {
  const { paymentMethod } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(addPaymentMethod(values, handleNext));
  };

  const formik = useFormik({
    initialValues: { payMethod: paymentMethod },
    validationSchema: Yup.object().shape({
      payMethod: Yup.string("Select your pay method").required(
        "Payment Method is required"
      ),
    }),
    onSubmit: handleSubmit,
  });
  return (
    <Grid container sx={{ p: 2 }}>
      <Grid xs={12} md={6} sx={{ margin: "auto" }} item>
        <Paper
          elevation={2}
          sx={{ borderColor: "grey.500", pt: 2, borderRadius: 4 }}
        >
          <Typography align="center" variant="h6">
            Select a Pay Option
          </Typography>
          <Box sx={{ p: 2 }}>
            <form onSubmit={formik.handleSubmit}>
              <RadioGroup
                aria-label="paymentMethod"
                name="payMethod"
                onChange={formik.handleChange}
                defaultValue={`${paymentMethod}`}
              >
                {payOptions.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    disabled={option.disabled}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth={false}
                  type="submit"
                  onClick={formik.handleSubmit}
                >
                  Next
                </Button>
                <Box sx={{ border: 0, flex: "1 1 auto " }} />
                <Button
                  color="error"
                  variant="contained"
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default index;
