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
  Link as MuiLink,
} from '@mui/material';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import Link from 'next/link';
import fetchJson from '../../lib/fetchJson';
import useUser from '../../lib/useUser';

const api = process.env.NEXT_PUBLIC_API_URL;

const axiosObj = (data) => ({
  method: 'POST',
  url: `${api}/auth/forgotpassword/`,
  data: data,
});

export default function LoginForm() {
  const [headMsg, setHeadMeg] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: 'user@gmail.com',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string('Enter your password')
        .email('Enter a valid email')
        .required('Email is required'),
    }),
    onSubmit: async (value, action) => {
      try {
        const { data } = await fetchJson(axiosObj(value));
        setHeadMeg({
          success: true,
          msg: data.msg,
        });
        action.setSubmitting(false);
      } catch (err) {
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
      <DialogTitle sx={{ textAlign: 'center' }}>Forgot Password</DialogTitle>

      {headMsg &&
        (headMsg.success ? (
          <Alert severity="success" sx={{ mx: 4 }}>
            {headMsg.msg.startsWith('http') ? (
              <a href={headMsg.msg} target="_blank">
                Reset Password
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
