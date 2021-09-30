const notClient = typeof window !== 'undefined';
const cartItemFromStorage =
  notClient && localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const paymentMethodFromStorage =
  notClient && localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : 'pod';

const shippingAddressFromStorage =
  notClient && localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

const initialState = {
  cartItems: cartItemFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: paymentMethodFromStorage,
};

export default initialState;
