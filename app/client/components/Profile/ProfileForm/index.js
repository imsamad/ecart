import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Typography } from '@mui/material';
import MuiLink from '@mui/material/Link';
import fetchJson from '../../../lib/fetchJson';
import LinearProgress from '@mui/material/LinearProgress';
import { Alert } from '@mui/material';
import {
  profileFormValidationSchema as emailEditUnameSchema,
  editPasswordValidationSchema as pwdEditSchema,
} from './FormModal';
import { updateProfile } from '../../../redux/actions/profileAction';
import PwdField from '../../SignInUp/PwdField';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
const AccountForm = () => {
  const { user, errMsg, error, emailUpdated } = useSelector(
    (state) => state.profile
  );

  const [headMsg, setHeadMsg] = React.useState(null);

  const [editPwd, setEditPwd] = React.useState(false);
  const [editDetails, setEditDetails] = React.useState(true);
  const dispatch = useDispatch();
  const changeEmailUname = async (value, action) => {
    await dispatch(updateProfile(value));
    formik.setSubmitting(false);
    formik.resetForm();
    setEditPwd(false);
    setEditDetails(false);
  };
  const changePwd = async (value, action) => {
    try {
      const axiosObj = (data) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/updatepassword`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        data: data,
      });
      await fetchJson(axiosObj(value));

      formik.setSubmitting(false);
      formik.resetForm();
      setEditPwd(false);
      setEditDetails(false);

      setHeadMsg({
        success: true,
        msg: 'Password Updated.',
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
    enableReinitialize: true,
    validationSchema: validationSchema,
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

  const toggleEditPwd = () => {
    setEditPwd(!editPwd);
  };

  const toggleEditDetails = () => {
    setEditDetails(!editDetails);
  };

  return (
    <Box
      sx={{ p: 1, border: 1, borderRadius: 2, borderColor: 'secondary.light' }}
    >
      {formik.isSubmitting && <LinearProgress />}
      <Typography align="center" gutterBottom variant="h6">
        My Account
      </Typography>
      {error && (
        <Typography align="center" gutterBottom variant="body1" color="error">
          {errMsg}
        </Typography>
      )}
      {emailUpdated && (
        <Alert severity="info" sx={{ m: 2 }}>
          {emailUpdated.startsWith('http') ? (
            <a href={emailUpdated} target="_blank">
              Confirm your email
            </a>
          ) : (
            emailUpdated
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
          severity={headMsg.error ? 'error' : 'success'}
          sx={{ m: 2 }}
        >
          {headMsg.msg}
        </Alert>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        {!editPwd && (
          <TextField
            fullWidth
            size="small"
            margin="dense"
            label="User Name"
            {...getProps('username')}
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
          // disabled={editPwd}
          {...getProps('email')}
        />
        {editPwd && (
          <>
            <PwdField
              formik={formik}
              identifier="currentPassword"
              label="Old password"
              variant="outlined"
              size="small"
            />
            <PwdField
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
            Edit Password
          </MuiLink>
        </Typography>
        <LoadingButton
          endIcon={<SendIcon />}
          loading={formik.isSubmitting}
          loadingPosition="end"
          disabled={formik.isSubmitting || editDetails}
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
          onClick={toggleEditDetails}
          endIcon={<EditIcon />}
          // loading={true}
          loadingPosition="end"
          variant="contained"
          size="small"
        >
          {editDetails ? 'Edit' : 'No I m ok'}
        </LoadingButton>
      </form>
    </Box>
  );
};
export default AccountForm;
