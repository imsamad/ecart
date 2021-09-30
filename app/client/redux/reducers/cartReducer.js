import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_INC_ITEM,
  CART_DEC_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConst';

import initState from '../initialState';

const cartReducer = (state = { ...initState }, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ADD_ITEM:
      const item = payload;

      const existItem = state.cartItems
        .map((p) => p.product)
        .indexOf(item.product);

      if (existItem >= 0) {
        item.qty = state.cartItems[existItem].qty + 1;
        return {
          ...state,
          cartItems: state.cartItems.map((x, index) =>
            index === existItem ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== payload),
      };

    case CART_INC_ITEM:
      const { qty } = action;

      const newCart = state.cartItems.map((x) => {
        const willGoOutOfStock = x.countInStock < x.qty + qty;
        if (x.product === payload && !willGoOutOfStock) {
          x.qty = x.qty + qty;
        }
        return x;
      });

      return {
        ...state,
        cartItems: newCart,
      };

    case CART_DEC_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((x) => {
          if (x.product === payload) {
            if (Number(x.qty - 1) !== 0) --x.qty;
          }
          return x;
        }),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: payload };

    default:
      return state;
  }
};
export default cartReducer;
