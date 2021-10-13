import React from 'react';
import { Grid, Button, Typography, Paper } from '@mui/material';

import TextField from '@mui/material/TextField';
import {
  AddressFormModel,
  validationSchema,
} from '../../FormModals/AddressModal';
const fields = Object.keys(AddressFormModel);
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { addAddress } from '../../../redux/actions/cartActions';
const index = ({ handleNext }) => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleSubmit = (values, action) => {
    dispatch(addAddress(values, handleNext));
  };
  const formik = useFormik({
    initialValues: shippingAddress,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: true,
  });
  return (
    <Grid container spacing={2}>
      <Grid
        xs={12}
        md={7}
        item
        sx={{
          m: 'auto',
          mt: 4,
        }}
      >
        <Paper sx={{ p: 2, borderRadius: 4, borderColor: 'grey.600' }}>
          <Typography align="center" variant="h6">
            Shipping address
          </Typography>
          <form>
            {fields.map((field) => {
              const identifier = AddressFormModel[field].name;
              return (
                <TextField
                  key={`${identifier}`}
                  id={`${identifier}`}
                  label={`${AddressFormModel[field].label}`}
                  type="text"
                  fullWidth
                  margin="normal"
                  size="small"
                  onChange={formik.handleChange}
                  defaultValue={`${formik.values[identifier]}`}
                  error={Boolean(formik.errors[identifier])}
                  helperText={formik.errors[identifier]}
                  name={`${identifier}`}
                />
              );
            })}

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              onClick={formik.handleSubmit}
            >
              Next
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default index;
