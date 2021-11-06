import fetchJson from './fetchJson';

const login = async (values, action, isSignIn, mutateUser, setHeadMsg) => {
  // Prepare req body object
  const body = { email: values.email, password: values.password };
  // If register forfirst time ,append username prop
  if (!isSignIn) body.username = values.username;

  const axios = (url, data) => ({
    url: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });

  let API_URL = process.env.NEXT_PUBLIC_API_URL;
  API_URL = isSignIn ? `${API_URL}/auth/login` : `${API_URL}/auth/register`;

  try {
    const { data } = await fetchJson(axios(API_URL, body));

    if (!isSignIn) {
      setHeadMsg({
        register: true,
        msg: data.msg,
      });
      action.resetForm();
    } else {
      // set cookie
      mutateUser(await fetchJson(axios('/api/user', data.user)));
      action.resetForm();
    }
  } catch (error) {
    action.setSubmitting(false);
    const doInclude = (val) => error.message.indexOf(val) > -1;

    if (doInclude('Email') || doInclude('email')) {
      action.setErrors({ email: error.message });
    } else if (doInclude('Password') || doInclude('password')) {
      action.setErrors({ password: error.message });
    } else if (doInclude('Duplicate') || doInclude('duplicate')) {
      action.setErrors({ email: 'This email already taken.' });
    } else {
      setHeadMsg({ error: true, msg: 'Invalid credential,Try Again...!' });
    }
  }
};

export default login;
