import fetchJson from "./fetchJson";

const login = async (values, action, isSignIn, mutateUser, setConfirmMsg) => {
  // Prepare req body object
  const body = { email: values.email, password: values.password };
  // If user registering  ,append username prop
  if (!isSignIn) body.username = values.username;

  const axios = (url, data) => ({
    url,
    data,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let API_URL = process.env.NEXT_PUBLIC_API_URL;

  API_URL = isSignIn ? `${API_URL}/auth/login` : `${API_URL}/auth/register`;

  try {
    const fetchData = await fetchJson(axios(API_URL, body));
    const { data, success } = fetchData;
    if (!success) {
      throw new Error("Invalid message.");
    }
    if (!isSignIn) {
      setConfirmMsg({
        register: true,
        msg: data.message,
      });
      action.resetForm();
    } else {
      // set cookie
      mutateUser(await fetchJson(axios("/api/user", data.user)));
      action.resetForm();
    }
  } catch (error) {
    action.setSubmitting(false);
    const doInclude = (val) => error.message.indexOf(val) > -1;

    if (doInclude("Email") || doInclude("email")) {
      action.setErrors({ email: error.message });
    } else if (doInclude("Password") || doInclude("password")) {
      action.setErrors({ password: error.message });
    } else if (doInclude("Duplicate") || doInclude("duplicate")) {
      action.setErrors({ email: "This email already taken." });
    } else {
      setConfirmMsg({ error: true, msg: "Invalid credential,Try Again...!" });
    }
  }
};

export default login;
