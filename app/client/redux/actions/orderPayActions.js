import {
  ORDER_PAY_INIT,
  ORDER_PAY_REQ,
  ORDER_PAY_SUCC,
  ORDER_PAY_ERR,
} from '../constants/orderPayConst';

import fetchJson from '../../lib/fetchJson';

const axios = async (orderId, data) => {
  const { token } = await fetchJson('/api/user');
  return {
    url: `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/pay`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
};
export const payOrder = (orderId, paymentResult) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_PAY_REQ });
    const {
      data: { order },
    } = await fetchJson(await axios(orderId, paymentResult));
    console.log('Data payOrder', order);
    dispatch({
      type: ORDER_PAY_SUCC,
      payload: {
        orderId: order.id,
        isPaid: order.isPaid,
        paymentMethod: order.paymentMethod,
        paidAt: order.paidAt,
      },
    });
  } catch (err) {
    dispatch({ type: ORDER_PAY_ERR });
  }
};

export const initOrder =
  ({ isPaid, paymentMethod, orderId }) =>
  (dispatch) => {
    dispatch({
      type: ORDER_PAY_INIT,
      payload: { isPaid, paymentMethod, orderId },
    });
  };
