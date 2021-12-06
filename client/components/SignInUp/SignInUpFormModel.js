import * as Yup from "yup";

export const FormModel = {
  formId: "signInForm",

  password: {
    name: "password",
    label: "Password *",
    stringErrorMsg: "Enter your password",
    requiredErrorMsg: "Password is required",
    minLength: 8,
    minLengthErrorMsg: "Password should be of minimum 8 characters length",
  },
  email: {
    name: "email",
    label: "Email *",
    requiredErrorMsg: "Email is required",
    validErrorMsg: "Enter a valid email",
    stringErrorMsg: "Enter your email",
  },
  username: {
    name: "username",
    label: "Username *",
    stringErrorMsg: "Enter your Username",
    requiredErrorMsg: "Username is required",
    minLength: 6,
    minLengthErrorMsg: "Username should be of minimum 6 characters length",
  },
};

const signInInitialValues = {
  email: "user@gmail.com",
  password: "12345678",
};

const signUpInitialValues = {
  username: "User Account",
  email: "user@gmail.com",
  password: "12345678",
};
const emailValidation = Yup.string("Enter your password")
  .email("Enter a valid email")
  .required("Email is required");
const passwordValidation = Yup.string("Enter your password")
  .min(8, "Password should be of minimum 8 characters length")
  .test(
    "password",
    "Password should be of minimum 8 characters length",
    (value) => {
      const len = value?.trim().split(" ").join("").length;
      return len >= 8 ? true : false;
    }
  )
  .required("Password is required");

const usernameValidation = Yup.string("Enter your Username")
  .min(6, "Username should be of minimum 6 characters length")
  .test(
    "username",
    "Username should be of minimum 6 characters length",
    (value) => {
      const len = value?.trim().split(" ").join("").length;
      return len >= 6 ? true : false;
    }
  )
  .required("Username is required");

const signInValidationSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

const signUpValidationSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  username: usernameValidation,
});

const signUpModel = {
  validation: signUpValidationSchema,
  initialValues: signUpInitialValues,
};

const signInModel = {
  validation: signInValidationSchema,
  initialValues: signInInitialValues,
};

export {
  signUpModel,
  signInModel,
  emailValidation,
  passwordValidation,
  usernameValidation,
};
