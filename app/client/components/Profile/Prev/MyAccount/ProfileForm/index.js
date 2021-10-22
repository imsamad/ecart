import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { profileFormValidationSchema as validationSchema } from './FormModal';
const genders = [
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

const AccountForm = () => {
  const { user } = useSelector((state) => state.profile);
  const initialValues = {
    username: user.username,
    email: user.email,
    gender: user.gender ?? 'male',
  };
  const onSubmit = (value) => console.log('onSubmitonSubmit', value);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const renProps = (name) => ({
    value: formik.values[name],
    onChange: formik.handleChange,
    error: Boolean(formik.errors[name]),
    helperText: formik.errors[name],
  });
  const [disabled, setDisabled] = React.useState(true);
  return (
    <Box
      sx={{ p: 1, border: 1, borderRadius: 2, borderColor: 'secondary.light' }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          !disabled && formik.handleSubmit();
        }}
      >
        <TextField
          fullWidth
          name="username"
          size="small"
          margin="dense"
          id="username"
          label="User Name"
          {...renProps('username')}
          disabled={disabled}
        />
        <TextField
          disabled={disabled}
          fullWidth
          name="email"
          size="small"
          margin="dense"
          id="email"
          label="Email"
          {...renProps('email')}
        />
        <TextField
          disabled={disabled}
          fullWidth
          name="gender"
          size="small"
          margin="dense"
          select
          id="gender"
          label="Gender"
          {...renProps('gender')}
        >
          {genders.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <LoadingButton
          endIcon={<SendIcon />}
          loading={formik.isSubmitting}
          loadingPosition="end"
          disabled={formik.isSubmitting || disabled}
          type="submit"
          variant="contained"
          size="small"
          sx={{ mr: 2, my: 2 }}
          disableElevation
        >
          Send
        </LoadingButton>
        <LoadingButton
          disableElevation
          onClick={() => setDisabled(!disabled)}
          endIcon={<EditIcon />}
          // loading={true}
          loadingPosition="end"
          variant="contained"
          size="small"
        >
          Edit
        </LoadingButton>
      </form>
    </Box>
  );
};
export default AccountForm;
