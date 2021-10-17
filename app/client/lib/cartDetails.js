import ccyFormat from './ccyFormat';
const cartDetails = (cartItems = [{ qty: 0, price: 0 }]) => {
  if (cartItems?.orderInvoice) {
    const { subTotal, shippingPrice, taxPrice, totalPrice } =
      cartItems?.orderInvoice;
    return {
      subTotal: ccyFormat(subTotal),
      shippingPrice: ccyFormat(shippingPrice),
      taxPrice: ccyFormat(taxPrice),
      total: ccyFormat(totalPrice),
    };
  }
  let subTotal = cartItems[0]?.qty * cartItems[0]?.price;
  if (cartItems.length > 1) {
    subTotal = cartItems
      .reduce(
        (acc, next) => Number(acc) + Number(next.qty) * Number(next.price),
        0
      )
      .toFixed(2);
  }
  subTotal = parseInt(subTotal, 10);

  const shippingPrice = subTotal > 100 ? 10 : 0;
  const taxPrcnt = subTotal > 100 ? 5 : 0;
  const taxPrice = subTotal * (taxPrcnt / 100);
  const total = subTotal + shippingPrice + taxPrice;
  return {
    subTotal: ccyFormat(subTotal),
    shippingPrice: ccyFormat(shippingPrice),
    taxPrice: ccyFormat(taxPrice),
    total: ccyFormat(total),
  };
};
export default cartDetails;
