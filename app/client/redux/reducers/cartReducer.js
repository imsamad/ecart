import {
  CART_INIT,
  CART_REQ,
  CART_ERR,
  CART_INCDEC_INT,
  CART_INCDEC_REQ,
  CART_INCDEC_ERR,
  CART_REM_INT,
  CART_REM_REQ,
  CART_REM_ERR,
  CART_ADD_INT,
  CART_ADD_REQ,
  CART_ADD_ERR,
} from '../constants/cartConst';

// POST REDUCER
const cartReducer = (state = { cart: { productItems: [] } }, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_INIT:
      return { loading: true, ...state };
    case CART_REQ:
      return { ...state, loading: false, cart: payload };
    case CART_ERR:
      console.log('Error from reducer');
      return { loading: false, error: true, message: payload };

    //Add Product
    case CART_ADD_INT:
      return { addLoading: true, ...state, addProduct: payload };
    case CART_ADD_REQ:
      return { ...state, addLoading: false, addProductStatus: true };
    case CART_ADD_ERR:
      console.log('Error from reducer');
      return {
        addLoading: false,
        addError: true,
        message: payload,
      };

    // Increment or decrement
    case CART_INCDEC_INT:
      return {
        ...state,
        incDecLoading: true,
        incDecProduct: payload,
      };
    case CART_INCDEC_REQ:
      return {
        ...state,
        incDecLoading: false,
        incDecUpdatedQty: payload,
      };
    case CART_INCDEC_ERR:
      return {
        ...state,
        incDecLoading: false,
        message: payload,
      };
    //Remove
    case CART_REM_INT:
      return {
        ...state,
        remLoading: true,
        remProduct: payload,
        remIndex: action.index,
      };
    case CART_REM_REQ:
      console.log('Before ', state);
      let { cart, ...rest } = state;
      let stateRest = rest;
      let { productItems, ...last } = cart;
      let cartRest = last;
      console.log('before productItems', productItems);
      console.log('payload', payload);
      let newProductItems = productItems.filter(
        (product) => product.product._id !== payload
      );
      console.log(' afetr newProductItems', newProductItems);
      let newCart = { productItems: newProductItems, ...cartRest };
      let newState = { cart: newCart, ...stateRest };
      console.log('newState ', newState);
      return {
        ...newState,
        remLoading: false,
        remStatus: true,
      };
    case CART_REM_ERR:
      return {
        ...state,
        remLoading: false,
        message: payload,
      };

    default:
      return state;
  }
};
export default cartReducer;
