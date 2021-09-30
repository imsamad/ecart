import ccyFormat from './ccyFormat';
const cartDetails = (cartItems = [{ qty: 0, price: 0 }]) => {
  let subTotal = cartItems[0]?.qty * cartItems[0]?.price;
  if (cartItems.length > 1) {
    subTotal = cartItems
      .slice(1)
      .reduce(
        (pre, next) => Number(pre) + Number(next.qty) * Number(next.price),
        Number(cartItems[0].qty) * Number(cartItems[0].price)
      )
      .toFixed(2);
  }
  subTotal = subTotal;

  const shippingPrice = subTotal > 100 ? 10 : 0;
  const taxPrice = subTotal > 100 ? 5 : 0;
  const total = subTotal + shippingPrice + taxPrice;

  return {
    subTotal: ccyFormat(subTotal),
    shippingPrice: ccyFormat(shippingPrice),
    taxPrice: ccyFormat(taxPrice),
    total: ccyFormat(total),
  };
};
export default cartDetails;
