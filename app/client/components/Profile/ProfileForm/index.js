import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Typography } from "@mui/material";
import MuiLink from "@mui/material/Link";
import fetchJson from "../../../lib/fetchJson";
import { Alert } from "@mui/material";
import {
  profileFormValidationSchema as emailEditUnameSchema,
  editPasswordValidationSchema as pwdEditSchema,
} from "./FormModal";
import { updateProfile } from "../../../redux/actions/profileAction";
import PwdField from "../../SignInUp/PwdField";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import FormProgress from "../../FormProgress";

const AccountForm = () => {
  const { user, errMsg, error, profileUpdateMsg } = useSelector(
    (state) => state.profile
  );

  const [headMsg, setHeadMsg] = React.useState(null);
  const [editPwd, setEditPwd] = React.useState(false);

  const dispatch = useDispatch();

  const changeEmailUname = async (value, action) => {
    await dispatch(updateProfile(value));
    action.setSubmitting(false);
    action.resetForm();
    setEditPwd(false);
  };

  const changePwd = async (value, action) => {
    try {
      const axiosObj = (data) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/updatepassword`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        data: data,
      });
      await fetchJson(axiosObj(value));

      formik.setSubmitting(false);
      formik.resetForm();
      setEditPwd(false);

      setHeadMsg({
        success: true,
        msg: "Password Updated.",
      });
    } catch (err) {
      setHeadMsg({
        error: true,
        msg: err.message,
      });
    }
  };

  const onSubmit = editPwd ? changePwd : changeEmailUname;

  const validationSchema = editPwd ? pwdEditSchema : emailEditUnameSchema;

  const formik = useFormik({
    initialValues: {
      username: user.username,
      email: user.email,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });
  const getProps = (name) => ({
    name: name,
    id: name,
    value: formik.values[name],
    onChange: formik.handleChange,
    error: Boolean(formik.errors[name]),
    helperText: formik.errors[name],
  });

  const toggleEditPwd = () => setEditPwd(!editPwd);

  return (
    <Box
      sx={{
        border: 1,
        borderRadius: 1,
        borderColor: "secondary.light",
        overflow: "hidden",
      }}
    >
      <FormProgress isTrue={formik.isSubmitting} noBg={true} />
      <Box
        sx={{
          p: 1,
        }}
      >
        <Typography align="center" sx={{ my: 1 }} variant="h6">
          My Account
        </Typography>
        {error && (
          <Typography align="center" gutterBottom variant="body1" color="error">
            {errMsg}
          </Typography>
        )}
        {profileUpdateMsg && (
          <Alert severity="info" sx={{ m: 2 }}>
            {profileUpdateMsg.startsWith("/confirm") ? (
              <a href={profileUpdateMsg}>Confirm your email</a>
            ) : (
              profileUpdateMsg
            )}
          </Alert>
        )}
        {headMsg && (
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setHeadMsg(null);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity={headMsg.error ? "error" : "success"}
            sx={{ m: 2 }}
          >
            {headMsg.msg}
          </Alert>
        )}
        {!editPwd && (
          <TextField
            fullWidth
            size="small"
            margin="dense"
            label="User Name"
            {...getProps("username")}
          />
        )}
        <TextField
          fullWidth
          size="small"
          margin="dense"
          label="Email"
          InputProps={{
            readOnly: editPwd,
          }}
          {...getProps("email")}
        />
        {editPwd && (
          <>
            <PwdField
              noLabelMargin
              formik={formik}
              identifier="currentPassword"
              label="Old password"
              variant="outlined"
              size="small"
            />
            <PwdField
              noLabelMargin
              formik={formik}
              identifier="newPassword"
              label="New password"
              variant="outlined"
              size="small"
            />
          </>
        )}
        <Typography align="right" sx={{ my: 1 }}>
          <MuiLink
            underline="hover"
            component="button"
            type="button"
            onClick={toggleEditPwd}
          >
            {!editPwd ? "Edit Password" : "No I'm Ok"}
          </MuiLink>
        </Typography>
        <LoadingButton
          endIcon={<SendIcon />}
          loading={formik.isSubmitting}
          loadingPosition="end"
          disabled={formik.isSubmitting}
          variant="contained"
          onClick={formik.handleSubmit}
          size="small"
          sx={{ mr: 2, my: 2 }}
          disableElevation
        >
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
};
export default AccountForm;
