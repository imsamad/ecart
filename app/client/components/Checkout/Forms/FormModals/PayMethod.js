import * as Yup from 'yup';

export const PayMethodFormModel = {
  payMethod: {
    name: 'payMethod',
    label: 'Payment Method *',
    stringErrorMsg: 'Select your pay method',
    requiredErrorMsg: 'Payment Method is required',
  },
};

export const validationSchema = Yup.object().shape({
  [PayMethodFormModel.payMethod.name]: Yup.string(
    PayMethodFormModel.payMethod.stringErrorMsg
  ).required(PayMethodFormModel.payMethod.requiredErrorMsg),
});
