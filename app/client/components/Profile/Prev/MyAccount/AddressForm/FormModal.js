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
export const initialState = {
  fullName: 'Abdus samad',
  typeOfAddr: 'Home',
  streetOne: 'Street One',
  streetTwo: 'Street Two',
  country: '1',
  // country: { id: '', label: '' },
  state: { id: '', label: '' },
  city: { id: '', label: '' },
  mobileNo: 123456789,
  zipcode: 2546,
};

export const validationSchema = Yup.object().shape({
  fullName: Yup.string('Enter your Full Name')
    .min(8, 'Full Name should be of minimum 8 characters length')
    .test(
      'fullName',
      'Full Name should be of minimum 8 characters length',
      (value) => {
        const len = value?.trim().split(' ').join('').length;
        return len >= 8 ? true : false;
      }
    )
    .required('Full Name is required'),

  typeOfAddr: Yup.mixed()
    .oneOf(['Home', 'Office'], 'Select a valid type')
    .required('Address Type is required!'),

  streetOne: Yup.string('Enter your Street1/Main Address').required(
    'Street1/Main address is required'
  ),

  streetTwo: Yup.string('Enter your Street2/Guiding Address').required(
    'Street2/Guiding address is required'
  ),
  // country: Yup.object({
  //   id: Yup.string().required('Country is required'),
  //   label: Yup.string().required('Country is required'),
  // }),
  country: Yup.string('Enter your County').required('Country is required'),

  // state: Yup.object({
  //   id: Yup.string().required('State is required'),
  //   label: Yup.string().required('State is required'),
  // }),
  state: Yup.string('Enter your State').required('State is required'),

  // city: Yup.object({
  //   id: Yup.string().required('City is required'),
  //   label: Yup.string().required('City is required'),
  // }),
  state: Yup.string('Enter your City').required('City is required'),

  mobileNo: Yup.string('Enter your Mobile No').required(
    'Mobile No is required'
  ),

  zipcode: Yup.string('Enter your Zip Code').required('Zip Code is required'),
});
