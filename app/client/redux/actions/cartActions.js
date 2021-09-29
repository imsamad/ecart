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
import fetchJson from '../../lib/fetchJson';

const axios = async (method, data) => {
  const { token } = await fetchJson('/api/user');
  return {
    url: `${process.env.NEXT_PUBLIC_API_URL}/carts`,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
};

export const incOrDec =
  (product, inc = true) =>
  async (dispatch) => {
    try {
      let data = {};
      if (inc && inc !== 'dec') {
        data = {
          increment: {
            product,
          },
        };
      } else {
        data = {
          decrement: {
            product,
          },
        };
      }
      dispatch({ type: CART_INCDEC_INT, payload: product });
      const { cart } = await fetchJson(await axios('PATCH', data));

      const updatedQty = cart.productItems.filter(
        (p) => p.product === product
      )[0].qty;

      dispatch({ type: CART_INCDEC_REQ, payload: updatedQty });
    } catch (err) {
      dispatch({ type: CART_INCDEC_ERR, payload: err.message });
    }
  };

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: CART_REM_INT, payload: productId });
    await fetchJson(await axios('PUT', { productId }));
    dispatch({ type: CART_REM_REQ, payload: productId });
  } catch (err) {
    dispatch({ type: CART_REM_ERR, message: err.message });
  }
};

export const addProduct =
  (productId, qty = 1) =>
  async (dispatch) => {
    try {
      console.log('Product recievced', productId);
      const data = { productItem: { productId: productId, qty } };
      console.log('data to sendt', data);
      dispatch({ type: CART_ADD_INT, payload: productId });
      const cart = await fetchJson(await axios('POST', data));
      console.log('From action ', cart);
      dispatch({ type: CART_ADD_REQ, addProductStatus: true });
    } catch (err) {
      console.log('Error from action ', err);
      dispatch({
        type: CART_ADD_ERR,
        message: err.message,
      });
    }
  };
