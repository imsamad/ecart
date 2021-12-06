import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_INC_ITEM,
  CART_DEC_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConst";
import fetchJson from "../../lib/fetchJson";

const addToLS = (data, identfier = "cartItems") => {
  localStorage.setItem(identfier, JSON.stringify(data));
};

export const increment =
  (productId, qty = 1) =>
  (dispatch, getState) => {
    dispatch({ type: CART_INC_ITEM, payload: productId, qty });
    addToLS(getState().cart.cartItems);
  };

export const decrement = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_DEC_ITEM, payload: productId });
  addToLS(getState().cart.cartItems);
};

export const removeProduct = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  addToLS(getState().cart.cartItems);
};

export const addProduct =
  (productId, qty = 1) =>
  async (dispatch, getState) => {
    // If product already in cart then ....
    const existItem = getState()
      .cart.cartItems.map((p) => p.product)
      .indexOf(productId);
    // ... simply do increment.
    if (existItem >= 0) {
      dispatch(increment(productId));
      // we could trigger snackbar from here also.
    } else {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`;
      const product = await fetchJson({
        method: "GET",
        url,
      });

      if (product) {
        const payload = {
          product: product._id,
          name: product.name,
          slug: product.slug,
          image: product.image,
          price: product.price,
          qty: qty,
          countInStock: product.countInStock,
        };

        if (product.countInStock > 0) {
          dispatch({ type: CART_ADD_ITEM, payload });
          addToLS(getState().cart.cartItems);
          // we could trigger snackbar from here also.
        }
      }
    }
  };
export const addAddress = (address, nextStep) => async (dispatch, getState) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: address });
  nextStep();
  addToLS(getState().cart.shippingAddress, "shippingAddress");
};

export const addPaymentMethod =
  ({ payMethod }, handleNext) =>
  (dispatch, getState) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: payMethod });
    addToLS(getState().cart.paymentMethod, "paymentMethod");
    handleNext();
  };
