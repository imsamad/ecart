import fetchJson from './fetchJson';

const axios = async (data) => {
  const { token } = await fetchJson('/api/user');
  return {
    url: `${process.env.NEXT_PUBLIC_API_URL}/carts`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
};
const addProduct = async (productId, setState, qty = 1) => {
  try {
    setState(true);
    const data = { productItem: { productId: productId, qty } };
    await fetchJson(await axios(data));
    setState(false);
  } catch (err) {
    console.log('Error from action ', err);
    setState(false);
  }
};
export default addProduct;
