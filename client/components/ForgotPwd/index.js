import { useRef } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Alert,
  Link as MuiLink,
} from "@mui/material";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import Link from "next/link";
import fetchJson from "../../lib/fetchJson";
import FormProgress from "../FormProgress";
const api = process.env.NEXT_PUBLIC_API_URL;

const axiosObj = (data) => ({
  method: "POST",
  url: `${api}/auth/forgotpassword/`,
  data: data,
});

export default function LoginForm() {
  const confirmMsg = useRef(null);
  const formik = useFormik({
    initialValues: {
      email: "user@gmail.com",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string("Enter your password")
        .email("Enter a valid email")
        .required("Email is required"),
    }),
    onSubmit: async (value, action) => {
      try {
        const fetchData = await fetchJson(axiosObj(value));
        const { data, success } = fetchData;
        if (!success) {
          confirmMsg.current = {
            error: true,
            msg: "Unable to submit,plz try again",
          };
        }

        confirmMsg.current = {
          success: true,
          msg: data.message,
        };

        action.setSubmitting(false);
      } catch (err) {
        const doInclude = err.message.indexOf("no user with") > -1;
        if (doInclude) {
          confirmMsg.current = {
            error: true,
            msg: err.message,
          };
        } else {
          confirmMsg.current = {
            error: true,
            msg: "Unable to submit,plz try again",
          };
        }
        action.setSubmitting(false);
      }
    },
    validateOnChange: true,
  });
  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: "sm",
        mx: "auto",
      }}
    >
      <FormProgress isTrue={formik.isSubmitting} />
      <Box
        sx={{
          overflow: "hidden",
          position: "relative",
          p: 3,
        }}
      >
        <Typography variant="h6" align="center" sx={{ my: 1 }}>
          Forgot Password
        </Typography>

        {confirmMsg.current &&
          (confirmMsg.current.success ? (
            <Alert severity="success" sx={{ mx: 4 }}>
              {confirmMsg.current.msg.startsWith("/reset") ? (
                <a href={confirmMsg.current.msg}>Reset Password</a>
              ) : (
                confirmMsg.current.msg
              )}
            </Alert>
          ) : (
            <Alert severity="error" sx={{ mx: 4 }}>
              {confirmMsg.current.msg}
            </Alert>
          ))}

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

        <Link href="/login">
          <MuiLink sx={{ m: 2, ml: 0 }} underline="hover" component="button">
            Login
          </MuiLink>
        </Link>
        <Link href="/login?type=register">
          <MuiLink underline="hover" component="button">
            Register
          </MuiLink>
        </Link>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
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
        </Box>
      </Box>
    </Paper>
  );
}
