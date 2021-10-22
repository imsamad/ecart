import * as Yup from 'yup';

export const FormModel = {
  formId: 'profileForm',

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

const profileFormValidationSchema = Yup.object().shape({
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),

  username: Yup.string('Enter your Username')
    .min(6, 'Username should be of minimum 6 characters length')
    .test(
      'username',
      'Username should be of minimum 6 characters length',
      (value) => {
        const len = value?.trim().split(' ').join('').length;
        return len >= 6 ? true : false;
      }
    )
    .required('Username is required'),
  gender: Yup.mixed()
    .oneOf(['male', 'female', 'other'])
    .required('Gender is required!'),
});

export { profileFormValidationSchema };
