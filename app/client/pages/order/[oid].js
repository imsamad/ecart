import React from 'react';
import { useDispatch } from 'react-redux';
import SingleOrder from '../../components/SingleOrder';
import withSession from '../../lib/session';
import fetchJson from '../../lib/fetchJson';

import { initPayOrder } from '../../redux/actions/orderPayActions';

const index = ({ data: order }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      initPayOrder({
        isPaid: order?.isPaid,
        paymentMethod: order.paymentMethod,
        orderId: order?._id ?? order.id,
      })
    );
  }, []);

  return <SingleOrder />;
};

export default index;

export const getServerSideProps = withSession(async function (ctx) {
  const { req } = ctx;

  const token = req.session.get('user')?.token;
  if (!token) {
    return {
      redirect: {
        destination: `/login?redirectTo=order/${ctx.query.oid}`,
        permanent: false,
      },
    };
  }

  const api = `${process.env.API_URL}/orders/${ctx.query.oid}`;
  const {
    data: { order },
  } = await fetchJson({
    url: api,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    props: {
      data: order,
      reduxData: {
        reducerName: 'order',
        fieldName: 'order',
      },
    },
  };
});
