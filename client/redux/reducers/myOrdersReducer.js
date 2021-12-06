import {
  MY_ORDERS_INIT,
  MY_ORDERS_REQ,
  MY_ORDERS_SUCC,
  MY_ORDERS_ERR,
} from '../constants/myOrdersConst';

const myOrdersReducer = (state = { orders: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case MY_ORDERS_REQ:
      return { loading: true, ...state };
    case MY_ORDERS_SUCC:
      return { ...state, loading: false, orders: payload };
    case MY_ORDERS_ERR:
      return { loading: false, error: true };
    default:
      return state;
  }
};

export default myOrdersReducer;
