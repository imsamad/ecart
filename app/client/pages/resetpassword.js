import React, { useState } from 'react';
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
  Link as MuiLink,
} from '@mui/material';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import fetchJson from '../lib/fetchJson';
import PwdField from '../components/SignInUp/PwdField';
const api = process.env.NEXT_PUBLIC_API_URL;

const axiosObj = (token, data) => ({
  method: 'PUT',
  url: `${api}/auth/resetpassword/${token}`,
  data: data,
});

export default function LoginForm() {
  const [headMsg, setHeadMeg] = useState(null);
  const router = useRouter();
  const { token } = router.query;
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object().shape({
      password: Yup.string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .test(
          'password',
          'Password should be of minimum 8 characters length',
          (value) => {
            const len = value?.trim().split(' ').join('').length;
            return len >= 8 ? true : false;
          }
        )
        .required('Password is required'),
    }),
    onSubmit: async (value, action) => {
      try {
        const { data } = await fetchJson(axiosObj(token, value));
        if (data) {
          router.replace('/login');
        }
      } catch (err) {
        if (err.message.indexOf('Invalid') > -1) {
          return router.replace('/login');
        }
        setHeadMeg({
          error: true,
          msg: 'Unable to submit,plz try again',
        });
        action.setSubmitting(false);
      }
    },
    validateOnChange: true,
    enableReinitialize: true,
  });
  React.useEffect(() => {
    formik.resetForm();
  }, [token]);
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
      <DialogTitle sx={{ textAlign: 'center' }}>Reset Password</DialogTitle>

      {headMsg && (
        <Alert severity="error" sx={{ mx: 4 }}>
          {headMsg.msg}
        </Alert>
      )}

      <DialogContent>
        <Box sx={{ m: 1 }} noValidate>
          <form>
            <PwdField
              formik={formik}
              identifier="password"
              label="New Password"
            />
          </form>
        </Box>
        <DialogContentText sx={{ mt: 4 }}>
          <Link href="/login">
            <MuiLink sx={{ mx: 2 }} underline="hover" component="button">
              Login
            </MuiLink>
          </Link>
          <Link href="/login">
            <MuiLink sx={{ mx: 2 }} underline="hover" component="button">
              Register
            </MuiLink>
          </Link>
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
          Reset
        </LoadingButton>
      </DialogActions>
    </Paper>
  );
}
