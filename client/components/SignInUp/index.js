import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  LinearProgress,
  Alert,
  Typography,
  Button,
} from "@mui/material";
import MuiLink from "@mui/material/Link";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Link from "next/link";

import useUser from "../../lib/useUser";
import loginFun from "../../lib/loginFun";
import { signInModel, signUpModel } from "./SignInUpFormModel";
import PasswordField from "./PwdField";
import FormProgress from "../FormProgress";

export default function LoginForm() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [confirmMsg, setConfirmMsg] = useState(null);
  const router = useRouter();
  const redirectTo = router?.query?.redirectTo;

  const { mutateUser } = useUser({
    redirectTo: redirectTo ? redirectTo : "/profile",
    redirectIfFound: true,
  });

  const handleSubmit = (values, action) => {
    loginFun(values, action, isSignIn, mutateUser, setConfirmMsg);
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

  let formLabel = isSignIn ? "Sign In" : "Sign Up";

  const switchForm = () => {
    setConfirmMsg(null);
    formik.resetForm({});
    setIsSignIn(!isSignIn);
  };

  const getProps = (name, label) => ({
    id: name,
    label: label,
    name: name,
    value: formik.values[name],
    onChange: formik.handleChange,
    error: formik.touched[name] && Boolean(formik.errors[name]),
    helperText: formik.touched[name] && formik.errors[name],
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
          {formLabel}
        </Typography>

        {confirmMsg &&
          (confirmMsg.register ? (
            <Alert severity="success" sx={{ mx: 4 }}>
              {confirmMsg.msg.startsWith("/confirm") ? (
                <a href={confirmMsg.msg}>Confirm your email</a>
              ) : (
                confirmMsg.msg
              )}
            </Alert>
          ) : (
            <Alert severity="error" sx={{ mx: 4 }}>
              {confirmMsg.msg}
            </Alert>
          ))}

        <form>
          {!isSignIn && (
            <TextField
              fullWidth
              margin="normal"
              variant="standard"
              {...getProps("username", "Username *")}
            />
          )}
          <TextField
            fullWidth
            margin="normal"
            variant="standard"
            {...getProps("email", "Email *")}
          />
          <PasswordField formik={formik} identifier="password" />
        </form>

        <Box
          sx={{
            my: 1,
            ml: "auto",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link href="/forgotpassword">
            <MuiLink underline="hover" component="button">
              Forget Password
            </MuiLink>
          </Link>
        </Box>

        <Box sx={{ mt: 4, display: "flex", alignItems: "center" }}>
          {isSignIn ? (
            <>
              <Typography> Not Account?</Typography> {"  "}
              <Button
                variant="text"
                sx={{ textDecoration: "underline", textTransform: "none" }}
                onClick={switchForm}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <Typography>Already account. {"  "}</Typography>
              <Button
                variant="text"
                sx={{ textDecoration: "underline", textTransform: "none" }}
                onClick={switchForm}
              >
                Login
              </Button>
            </>
          )}
        </Box>

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
            Submit
          </LoadingButton>
        </Box>
      </Box>
    </Paper>
  );
}
