import React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import MenuItem from '@mui/material/MenuItem';
import dynamic from 'next/dynamic';
import { useFormik, Formik, Form } from 'formik';
const AddressField = dynamic(() => import('./AddressField'));
import { validationSchema, initialState } from './FormModal';

import TextField from '../../../../FormFields/InputField';
import SelectField from '../../../../FormFields/SelectField';
const types = [
  { label: 'Home', value: 'Home' },
  { value: 'Office', label: 'Office' },
  { value: 'XXXX', label: 'XXXX' },
];
const countries = [
  {
    id: 1,
    label: 'Afghanistan',
    phone_code: '93',
  },
  {
    id: 2,
    label: 'Aland Islands',
    phone_code: '+358-18',
  },
  {
    id: 3,
    label: 'Albania',
    phone_code: '355',
  },
  {
    id: 4,
    label: 'Algeria',
    phone_code: '213',
  },
];
const AddressForm = () => {
  // const onSubmit = (values) => {
  //   console.log('Values ', values);
  // // };
  // const formik = useFormik({

  // });
  // const getProps = (name) => ({
  //   // value: formik.values[name] ?? '',
  //   onChange: formik.handleChange,
  //   error: Boolean(formik.errors[name]),
  //   helperText: formik.errors[name],
  // });
  // console.log('formikformik', formik);
  return (
    <Box
      sx={{ p: 1, border: 1, borderRadius: 2, borderColor: 'secondary.light' }}
    >
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={(values, action) => {
          console.log('actionaction', action);
          console.log('Ok', values);
        }}
      >
        {(props) => {
          // console.log('Props ', props);
          return (
            <Form>
              <SelectField
                data={types}
                name="typeOfAddr"
                fullWidth
                size="small"
                margin="dense"
                select
                label="Select Type Of Addr."
              />
              <TextField
                fullWidth
                size="small"
                margin="dense"
                label="Reciever Full Name *"
                name="fullName"
              />
              <TextField
                fullWidth
                size="small"
                margin="dense"
                label="Street One"
                name="streetOne"
              />
              <TextField
                fullWidth
                size="small"
                margin="dense"
                label="Street Two"
                name="streetTwo"
              />
              <SelectField
                data={countries}
                name="country"
                fullWidth
                size="small"
                margin="dense"
                select
                label="Select Country"
              />
              <AddressField />
              <TextField
                fullWidth
                size="small"
                margin="dense"
                label="Zip Code"
                name="zipcode"
              />
              <LoadingButton
                endIcon={<SendIcon />}
                // loading={true}
                type="submit"
                loadingPosition="end"
                variant="contained"
                size="small"
                sx={{ mr: 2, my: 2 }}
                disableElevation
              >
                Send
              </LoadingButton>
              <LoadingButton
                disableElevation
                onClick={() => {}}
                endIcon={<EditIcon />}
                // loading={true}
                loadingPosition="end"
                variant="contained"
                size="small"
              >
                Edit
              </LoadingButton>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
export default AddressForm;
