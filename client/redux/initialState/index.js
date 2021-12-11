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
    : {
      fullName:"AbdusSamad",
      mobileNo:'+91-9870645161',
      pinCode:'090909',
      city:'MyCity',
      landmark:"Near New Palaza",
      state:"UK",
      country:"India",
    };

const initialState = {
  cartItems: cartItemFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: paymentMethodFromStorage,
};

export default initialState;
