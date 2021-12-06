import {
  PRODUCT_INIT,
  PRODUCT_REQ,
  PRODUCT_ERR,
} from '../constants/productsConst';

// POST REDUCER
const productReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_INIT:
      return { loading: true, ...state };
    case PRODUCT_REQ:
      return { ...state, loading: false, products: payload };
    case PRODUCT_ERR:
      return { loading: false, error: true };
    default:
      return state;
  }
};
export default productReducer;
