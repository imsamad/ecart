import * as Yup from 'yup';

export const FormModel = {
  formId: 'signInForm',

  password: {
    name: 'password',
    label: 'Password *',
    stringErrorMsg: 'Enter your password',
    requiredErrorMsg: 'Password is required',
    minLength: 8,
    minLengthErrorMsg: 'Password should be of minimum 8 characters length',
  },
  email: {
    name: 'email',
    label: 'Email *',
    requiredErrorMsg: 'Email is required',
    validErrorMsg: 'Enter a valid email',
    stringErrorMsg: 'Enter your email',
  },
  username: {
    name: 'username',
    label: 'Username *',
    stringErrorMsg: 'Enter your Username',
    requiredErrorMsg: 'Username is required',
    minLength: 6,
    minLengthErrorMsg: 'Username should be of minimum 6 characters length',
  },
};

const signInInitialValues = {
  [FormModel.email.name]: 'user@gmail.com',
  [FormModel.password.name]: '12345678',
};

const signUpInitialValues = {
  [FormModel.username.name]: 'User Account',
  [FormModel.email.name]: 'user@gmail.com',
  [FormModel.password.name]: '12345678',
};

const signInValidationSchema = Yup.object().shape({
  [FormModel.email.name]: Yup.string(FormModel.email.stringErrorMsg)
    .email(FormModel.email.validErrorMsg)
    .required(FormModel.email.requiredErrorMsg),

  [FormModel.password.name]: Yup.string(FormModel.password.stringErrorMsg)
    .min(FormModel.password.minLength, FormModel.password.minLengthErrorMsg)
    .test(
      FormModel.password.name,
      FormModel.password.minLengthErrorMsg,
      (value) => {
        const len = value?.trim().split(' ').join('').length;
        return len >= 6 ? true : false;
      }
    )
    .required(FormModel.password.requiredErrorMsg),
});

const signUpValidationSchema = Yup.object().shape({
  [FormModel.email.name]: Yup.string(FormModel.email.stringErrorMsg)
    .email(FormModel.email.validErrorMsg)
    .required(FormModel.email.requiredErrorMsg),

  [FormModel.password.name]: Yup.string(FormModel.password.stringErrorMsg)
    .min(FormModel.password.minLength, FormModel.password.minLengthErrorMsg)
    .test(
      FormModel.password.name,
      FormModel.password.minLengthErrorMsg,
      (value) => {
        const len = value?.trim().split(' ').join('').length;
        return len >= FormModel.username.minLength ? true : false;
      }
    )
    .required(FormModel.password.requiredErrorMsg),

  [FormModel.username.name]: Yup.string(FormModel.username.stringErrorMsg)
    .min(FormModel.username.minLength, FormModel.username.minLengthErrorMsg)
    .test(
      FormModel.username.name,
      FormModel.username.minLengthErrorMsg,
      (value) => {
        const len = value?.trim().split(' ').join('').length;
        return len >= FormModel.username.minLength ? true : false;
      }
    )
    .required(FormModel.username.requiredErrorMsg),
});

const signUpModel = {
  validation: signUpValidationSchema,
  initialValues: signUpInitialValues,
};

const signInModel = {
  validation: signInValidationSchema,
  initialValues: signInInitialValues,
};

export { signUpModel, signInModel };
