import fetchJson from './fetchJson';

const axios = async (method, data) => {
  const { token } = await fetchJson('/api/user');
  return {
    url: `${process.env.NEXT_PUBLIC_API_URL}/orders`,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
};

const placeOrder = async (cart, redirectTo) => {
  const orderItems = cart.cartItems.map((item) => ({
    product: item.product,
    qty: item.qty,
  }));

  const shippingAddress = cart.shippingAddress;
  const paymentMethod = cart.paymentMethod;
  const data = { orderItems, shippingAddress, paymentMethod };
  const {
    data: { order },
  } = await fetchJson(await axios('POST', data));

  redirectTo(order.id);
};
export default placeOrder;
