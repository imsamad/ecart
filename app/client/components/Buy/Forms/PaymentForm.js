import {
  Button,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/system';
import { addPaymentMethod } from '../../../redux/actions/cartActions';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { validationSchema } from '../../FormModals/PayMethod';

const Pay = ({ handleNext, handleBack }) => {
  const { paymentMethod } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(addPaymentMethod(values, handleNext));
  };

  const formik = useFormik({
    initialValues: { payMethod: paymentMethod },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <Grid container sx={{ p: 2 }}>
      <Grid xs={12} md={6} sx={{ margin: 'auto' }} item>
        <Paper
          elevation={2}
          sx={{ border: 1, borderColor: 'grey.500', pt: 2, borderRadius: 4 }}
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
                <FormControlLabel
                  value="pod"
                  control={<Radio />}
                  label="Pay On Delivery"
                />
                <FormControlLabel
                  value="stripe"
                  control={<Radio />}
                  label="Stripe"
                />
                <FormControlLabel
                  value="payTm"
                  control={<Radio />}
                  label="PayTM"
                />
              </RadioGroup>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth={false}
                  type="submit"
                  onClick={formik.handleSubmit}
                >
                  Next
                </Button>
                <Box sx={{ border: 0, flex: '1 1 auto ' }} />
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
      {/* <NextPrevBtn handleBack={handleBack} /> */}
    </Grid>
  );
};

const NextPrevBtn = ({ handleBack }) => (
  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
    <Box sx={{ flex: '1 1 auto', border: 2 }} />{' '}
    <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
      Back
    </Button>
    {/* <Button onClick={handleNext}>
       {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
     </Button> */}
  </Box>
);
export default Pay;
