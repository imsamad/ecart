import {
  ORDER_PAY_INIT,
  ORDER_PAY_REQ,
  ORDER_PAY_ERR,
  ORDER_PAY_SUCC,
} from '../constants/orderPayConst';

// POST REDUCER
const orderPayReducer = (
  state = { paymentMethod: '', isPaid: false, orderId: '' },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_PAY_INIT:
      return { ...payload };
    case ORDER_PAY_REQ:
      return { loading: true, ...state };
    case ORDER_PAY_SUCC:
      console.log('payloadpayload', payload);
      return { ...state, loading: false, ...payload };
    case ORDER_PAY_ERR:
      return { loading: false, error: true };
    default:
      return state;
  }
};
export default orderPayReducer;
