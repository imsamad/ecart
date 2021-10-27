import {
  MY_ORDERS_INIT,
  MY_ORDERS_REQ,
  MY_ORDERS_SUCC,
  MY_ORDERS_ERR,
} from '../constants/myOrdersConst';

import fetchJson from '../../lib/fetchJson';

const axios = async () => {
  const { token } = await fetchJson('/api/user');
  return {
    url: `${process.env.NEXT_PUBLIC_API_URL}/orders/myorders`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};
export const getOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQ });
    const {
      data: { orders },
    } = await fetchJson(await axios());

    dispatch({ type: MY_ORDERS_SUCC, payload: orders });
  } catch (err) {
    dispatch({ type: MY_ORDERS_ERR });
  }
};
