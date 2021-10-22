import { MenuItem, TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

const SelectField = (props) => {
  const { data, name, ...rest } = props;

  const [field, meta] = useField(name);

  const { touched, error } = meta;

  const isError = touched && error && true;

  return (
    <TextField
      {...field}
      value={field?.value ?? field?.label ?? data[0].value ?? data[0].label}
      error={meta.touched && meta.error && true}
      helperText={isError && error}
      {...rest}
    >
      {data.map((option) => (
        <MenuItem
          key={option.value ?? option.id}
          value={option.id ?? option.value}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectField;
