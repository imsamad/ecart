import React from 'react';
import { Grid, Button, Typography, Paper, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import { AddressFormModel, validationSchema } from './FormModal.js';
const fields = Object.keys(AddressFormModel);
import { addAddress } from '../../../redux/actions/cartActions';

const index = ({ handleNext }) => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(addAddress(values, handleNext));
  };

  const formik = useFormik({
    initialValues: shippingAddress,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: true,
    enableReinitialize: false,
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
        <Paper sx={{ p: 2, borderRadius: 4, borderColor: 'grey.500' }}>
          <Typography align="center" variant="h6">
            Shipping address
          </Typography>
          <form>
            {fields.map((field) => {
              const identifier = AddressFormModel[field].name;
              return (
                <TextField
                  key={identifier}
                  id={identifier}
                  name={identifier}
                  label={AddressFormModel[`${field}`].label}
                  value={formik.values[`${identifier}`] ?? ''}
                  type="text"
                  fullWidth
                  margin="normal"
                  size="small"
                  autoFocus={true}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors[identifier])}
                  helperText={formik.errors[identifier]}
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
