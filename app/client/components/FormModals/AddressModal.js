import * as Yup from 'yup';
export const AddressFormModel = {
  fullName: {
    name: 'fullName',
    label: 'Full Name *',
    stringErrorMsg: 'Enter your full name',
    requiredErrorMsg: 'Full Name is required',
    minLength: 6,
    minLengthErrorMsg: 'Full Name should be of minimum 8 characters length',
  },
  mobileNo: {
    name: 'mobileNo',
    label: 'Mobile No. *',
    requiredErrorMsg: 'Mobile No. is required',
    validErrorMsg: 'Enter a valid Mobile No.',
    stringErrorMsg: 'Enter your Mobile No.',
  },
  pinCode: {
    name: 'pinCode',
    label: 'Pincode *',
    stringErrorMsg: 'Enter your PinCode',
    requiredErrorMsg: 'PinCode is required',
    validErrorMsg: 'Enter a valid PinCode.',
  },
  city: {
    name: 'city',
    label: 'City *',
    stringErrorMsg: 'Enter your City',
    requiredErrorMsg: 'City is required',
  },
  landmark: {
    name: 'landmark',
    label: 'Landmark *',
    stringErrorMsg: 'Enter your Landmark',
    requiredErrorMsg: 'Landmark is required',
    minLength: 6,
    minLengthErrorMsg: 'Landmark should be of minimum 6 characters length',
  },
  state: {
    name: 'state',
    label: 'State *',
    stringErrorMsg: 'Enter your State',
    requiredErrorMsg: 'State is required',
    minLength: 6,
    minLengthErrorMsg: 'State should be of minimum 6 characters length',
  },
  country: {
    name: 'country',
    label: 'Country *',
    stringErrorMsg: 'Enter your Country',
    requiredErrorMsg: 'Country is required',
  },
};

export const validationSchema = Yup.object().shape({
  // FullName
  [AddressFormModel.fullName.name]: Yup.string(
    AddressFormModel.fullName.stringErrorMsg
  )
    .required(AddressFormModel.fullName.requiredErrorMsg)
    .min(
      AddressFormModel.fullName.minLength,
      AddressFormModel.fullName.minLengthErrorMsg
    )
    .test(
      AddressFormModel.fullName.name,
      AddressFormModel.fullName.minLengthErrorMsg,
      (value) => {
        const len = value?.trim().split(' ').join('').length;
        return len >= AddressFormModel.fullName.minLength ? true : false;
      }
    ),
  // Mobile Name
  [AddressFormModel.mobileNo.name]: Yup.string(
    AddressFormModel.mobileNo.stringErrorMsg
  ).required(AddressFormModel.mobileNo.requiredErrorMsg),
  // PinCode
  [AddressFormModel.pinCode.name]: Yup.string(
    AddressFormModel.pinCode.stringErrorMsg
  ).required(AddressFormModel.pinCode.requiredErrorMsg),
  //  city
  [AddressFormModel.city.name]: Yup.string(
    AddressFormModel.city.stringErrorMsg
  ).required(AddressFormModel.city.requiredErrorMsg),
  // Landmark
  [AddressFormModel.landmark.name]: Yup.string(
    AddressFormModel.landmark.stringErrorMsg
  ).required(AddressFormModel.landmark.requiredErrorMsg),
  // City
  [AddressFormModel.state.name]: Yup.string(
    AddressFormModel.state.stringErrorMsg
  ).required(AddressFormModel.state.requiredErrorMsg),
  // Country
  [AddressFormModel.country.name]: Yup.string(
    AddressFormModel.country.stringErrorMsg
  ).required(AddressFormModel.country.requiredErrorMsg),
});
