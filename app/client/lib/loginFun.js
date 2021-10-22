import fetchJson from './fetchJson';
const login = async (values, action, isSignIn, mutateUser, setHeadError) => {
  const body = { email: values.email, password: values.password };

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
    const data = await fetchJson(axios(API_URL, body));
    mutateUser(await fetchJson(axios('/api/user', data)));
    action.resetForm();
    // snackBar.open({ body: `${data.email} Logged In...` });
  } catch (error) {
    const doHave = (val) => error.message.indexOf(val) > -1;
    action.setSubmitting(false);
    if (doHave('Email') || doHave('Email')) {
      action.setErrors({ email: error.message });
    } else if (doHave('Password') || doHave('password')) {
      action.setErrors({ password: error.message });
    } else if (doHave('Duplicate') || doHave('duplicate')) {
      action.setErrors({ email: 'This email already taken.' });
    } else {
      setHeadError('Invalid credential,Try Again...!');
    }
  }
};
export default login;
