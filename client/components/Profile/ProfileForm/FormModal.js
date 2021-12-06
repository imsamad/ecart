import * as Yup from 'yup';

const emailSchema = Yup.string('Enter your email')
  .email('Enter a valid email')
  .required('Email is required');

const usernameSchema = Yup.string('Enter your Username')
  .min(6, 'Username should be of minimum 6 characters length')
  .test(
    'username',
    'Username should be of minimum 6 characters length',
    (value) => {
      const len = value?.trim().split(' ').join('').length;
      return len >= 6 ? true : false;
    }
  )
  .required('Username is required');

const pwdSchema = Yup.string('Enter your password')
  .min(8, 'Password should be of minimum 8 characters length')
  .test(
    'password',
    'Password should be of minimum 8 characters length',
    (value) => {
      const len = value?.trim().split(' ').join('').length;
      return len >= 8 ? true : false;
    }
  )
  .required('Password is required');

const profileFormValidationSchema = Yup.object().shape({
  email: emailSchema,
  username: usernameSchema,
});

const editPasswordValidationSchema = Yup.object().shape({
  currentPassword: pwdSchema,
  newPassword: pwdSchema,
});
export { profileFormValidationSchema, editPasswordValidationSchema };
