import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';

export default function InputField(props) {
  const { errorText, name, ...rest } = props;
  const [field, meta] = useField(name);
  const { touched, error } = meta;
  const isError = touched && error && true;

  return (
    <TextField
      error={meta.touched && meta.error && true}
      helperText={isError && error}
      {...field}
      {...rest}
    />
  );
}
