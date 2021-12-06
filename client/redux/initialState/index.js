const isNotServer = typeof window !== "undefined";

const cartItemFromStorage =
  isNotServer && localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const paymentMethodFromStorage =
  isNotServer && localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : "payPal";

const shippingAddressFromStorage =
  isNotServer && localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

const initialState = {
  cartItems: cartItemFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: paymentMethodFromStorage,
};

export default initialState;
