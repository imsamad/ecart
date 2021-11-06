import React from 'react';
import {
  IconButton,
  InputLabel,
  InputAdornment,
  FormHelperText,
  FormControl,
  Input,
  FilledInput,
  OutlinedInput,
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';

const GetInput = (props) => {
  const { variant, ...rest } = props;
  if (variant === 'outlined') {
    return <OutlinedInput {...rest} />;
  } else if (variant === 'filled') {
    return <FilledInput {...rest} />;
  } else return <Input {...rest} />;
};

const PasswordField = ({ formik, identifier, label, variant, size }) => {
  const [showPassword, setShowPasword] = React.useState(false);
  const isError =
    formik.touched[identifier] && Boolean(formik.errors[identifier]);

  return (
    <FormControl
      fullWidth
      error={isError}
      margin="normal"
      size={size ? size : 'medium'}
    >
      <InputLabel htmlFor={variant} error={isError}>
        {label ? label : 'Password'}
      </InputLabel>
      <GetInput
        variant={variant ? variant : 'standard'}
        name={identifier}
        id={identifier}
        type={showPassword ? 'text' : 'password'}
        value={formik.values[identifier]}
        onChange={formik.handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPasword(!showPassword)}
              onMouseDown={(e) => e.preventDefault()}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        error={isError}
      />
      <FormHelperText id={`${identifier}-text`} error={true}>
        {formik.touched[identifier] && formik.errors[identifier]}
      </FormHelperText>
    </FormControl>
  );
};
export default PasswordField;
