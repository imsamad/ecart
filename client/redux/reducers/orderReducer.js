import { ORDER_INIT, ORDER_REQ, ORDER_ERR } from '../constants/orderConst';

// POST REDUCER
const productReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_INIT:
      return { loading: true, ...state };
    case ORDER_REQ:
      return { ...state, loading: false, order: payload };
    case ORDER_ERR:
      return { loading: false, error: true };
    default:
      return state;
  }
};
export default productReducer;
