import { useState } from 'react';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Paper,
  TextField,
  DialogContentText,
  Link,
  IconButton,
  InputLabel,
  InputAdornment,
  FormHelperText,
  FormControl,
  Input,
  Typography,
  LinearProgress,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import useUser from '../../lib/useUser';
import loginFun from '../../lib/loginFun';
import { signInModel, signUpModel } from './FormModel';
// import { useUICtx } from '../../UICtx';
export default function LoginForm() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [headError, setHeadError] = useState(null);
  const router = useRouter();
  const redirectTo = router?.query?.redirectTo;
  const { mutateUser } = useUser({
    redirectTo: redirectTo ? redirectTo : '/profile',
    redirectIfFound: true,
  });

  // const { snackBar } = useUICtx();
  const handleSubmit = (values, action) => {
    loginFun(values, action, isSignIn, mutateUser, setHeadError);
  };
  const initialValues = isSignIn
    ? signInModel.initialValues
    : signUpModel.initialValues;

  const validationSchema = isSignIn
    ? signInModel.validation
    : signUpModel.validation;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: false,
  });
  const formLabel = isSignIn ? 'Sign In' : 'Sign Up';
  const switchForm = () => {
    formik.setTouched({});
    formik.setErrors({});
    setIsSignIn(!isSignIn);
  };
  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 'sm',
        mx: 'auto',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {formik.isSubmitting && <LinearProgress />}
      <DialogTitle sx={{ textAlign: 'center' }}>{formLabel}</DialogTitle>

      <Typography color="rgba(255,0,0,0.7)" align="center">
        {headError && headError}
      </Typography>
      <DialogContent>
        <Box sx={{ m: 1 }} noValidate autoComplete="off">
          <form>
            {!isSignIn && (
              <TextField
                fullWidth
                margin="normal"
                id="username"
                label="Username *"
                variant="standard"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.username)}
                helperText={formik.errors.username}
              />
            )}
            <TextField
              fullWidth
              margin="normal"
              id="email"
              label="Email"
              variant="standard"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.email)}
              helperText={formik.errors.email}
            />
            <PasswordField formik={formik} />
          </form>
        </Box>
        <DialogContentText sx={{ mt: 4 }}>
          {isSignIn ? (
            <>
              Not Account? {'  '}
              <Link href="#" underline="always" onClick={switchForm}>
                Register
              </Link>
            </>
          ) : (
            <>
              Already account. {'  '}
              <Link href="#" underline="always" onClick={switchForm}>
                Login
              </Link>
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          disabled={formik.isSubmitting}
          loading={formik.isSubmitting}
          loadingPosition="start"
          startIcon={<SendIcon />}
          onClick={formik.handleSubmit}
          variant="contained"
          color="secondary"
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Paper>
  );
}
const PasswordField = ({ formik }) => {
  const [showPassword, setShowPasword] = useState(false);
  const isError = formik.touched.password && Boolean(formik.errors.password);
  return (
    <FormControl fullWidth error={isError} margin="normal" variant="standard">
      <InputLabel htmlFor="password" error={isError}>
        Password
      </InputLabel>
      <Input
        name="password"
        id="password"
        type={showPassword ? 'text' : 'password'}
        value={formik.values.password}
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
      <FormHelperText id="password-helper-text" error={true}>
        {formik.touched.password && formik.errors.password}
      </FormHelperText>
    </FormControl>
  );
};
