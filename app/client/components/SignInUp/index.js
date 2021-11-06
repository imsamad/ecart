import { useState } from 'react';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Paper,
  TextField,
  DialogContentText,
  LinearProgress,
  Alert,
  Typography,
} from '@mui/material';
import MuiLink from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Link from 'next/link';

import useUser from '../../lib/useUser';
import loginFun from '../../lib/loginFun';
import { signInModel, signUpModel } from './SignInUpFormModel';
import PasswordField from './PwdField';
export default function LoginForm() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [headMsg, setHeadMeg] = useState(null);
  const router = useRouter();
  const redirectTo = router?.query?.redirectTo;

  const { mutateUser } = useUser({
    redirectTo: redirectTo ? redirectTo : '/profile',
    redirectIfFound: true,
  });

  const handleSubmit = (values, action) => {
    loginFun(values, action, isSignIn, mutateUser, setHeadMeg);
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
    validateOnChange: true,
    enableReinitialize: true,
  });
  let formLabel = isSignIn ? 'Sign In' : 'Sign Up';
  const switchForm = () => {
    setHeadMeg(null);
    formik.resetForm({});
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

      {headMsg &&
        (headMsg.register ? (
          <Alert severity="success" sx={{ mx: 4 }}>
            {headMsg.msg.startsWith('http') ? (
              <a href={headMsg.msg} target="_blank">
                Confirm your email
              </a>
            ) : (
              headMsg.msg
            )}
          </Alert>
        ) : (
          <Alert severity="error" sx={{ mx: 4 }}>
            {headMsg.msg}
          </Alert>
        ))}

      <DialogContent>
        <Box sx={{ m: 1 }} noValidate>
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
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
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
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <PasswordField formik={formik} identifier="password" />
          </form>
        </Box>
        <Typography align="right" sx={{ my: 1 }}>
          <Link href="/forgotpassword">
            <MuiLink underline="hover" component="button">
              Forget Password
            </MuiLink>
          </Link>
        </Typography>
        <DialogContentText sx={{ mt: 4 }}>
          {isSignIn ? (
            <>
              Not Account? {'  '}
              <MuiLink href="#" underline="always" onClick={switchForm}>
                Register
              </MuiLink>
            </>
          ) : (
            <>
              Already account. {'  '}
              <MuiLink href="#" underline="always" onClick={switchForm}>
                Login
              </MuiLink>
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pr: 4, pb: 4 }}>
        <LoadingButton
          disableElevation
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
