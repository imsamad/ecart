import React, { useState } from "react";
import { Box, Paper, Alert, Link as MuiLink, Typography } from "@mui/material";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import fetchJson from "../lib/fetchJson";
import PwdField from "../components/SignInUp/PwdField";
import { passwordValidation } from "../components/SignInUp/SignInUpFormModel";
const api = process.env.NEXT_PUBLIC_API_URL;
import FormProgress from "../components/FormProgress";
const axiosObj = (token, data) => ({
  method: "PUT",
  url: `${api}/auth/resetpassword/${token}`,
  data: data,
});

export default function LoginForm() {
  const [headMsg, setHeadMeg] = useState(null);
  const router = useRouter();
  const { token } = router.query;
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object().shape({
      password: passwordValidation,
    }),
    onSubmit: async (value, action) => {
      try {
        const fetchData = await fetchJson(axiosObj(token, value));
        const { success } = fetchData;
        if (success) {
          router.replace("/login");
        }
      } catch (err) {
        if (err.message.indexOf("Invalid") > -1) {
          setHeadMeg({
            error: true,
            msg: "Invalid info!",
          });
        } else {
          setHeadMeg({
            error: true,
            msg: "Unable to submit,plz try again",
          });
        }
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
        maxWidth: "sm",
        mx: "auto",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {" "}
      <FormProgress isTrue={formik.isSubmitting} />
      <Box
        sx={{
          overflow: "hidden",
          position: "relative",
          p: 3,
        }}
      >
        <Typography variant="h6" align="center" sx={{ my: 1 }}>
          Reset Password
        </Typography>
        {headMsg && (
          <Alert severity="error" sx={{ mx: 4 }}>
            {headMsg.msg}
          </Alert>
        )}
        <PwdField formik={formik} identifier="password" label="New Password" />

        <Link href="/login">
          <MuiLink sx={{ mr: 2 }} underline="hover" component="button">
            Login
          </MuiLink>
        </Link>
        <Link href="/login">
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
