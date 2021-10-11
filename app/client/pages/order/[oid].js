import React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import withSession from '../../lib/session';
import fetchJson from '../../lib/fetchJson';
import ProductDetails, {
  Details,
} from '../../components/Buy/ReviewOrder/ProductDetails';

const product = ({ order }) => {
  console.log('orderorder', order);
  const orderItems = order.orderItems.map(
    ({ qty, product: { slug, image, price, name, countInStock } }) => ({
      qty,
      slug,
      image,
      price,
      name,
      countInStock,
    })
  );
  console.log('orderItems', orderItems);
  return (
    <Grid container>
      <Grid item xs={12} sm={8} md={9} sx={{ p: 1 }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            Shipping
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            Shipping
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ProductDetails cartItems={orderItems} fromOrder />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4} md={3} sx={{ p: 1 }}>
        <Details cartItems={orderItems} />
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = withSession(async function (ctx) {
  const { req, res } = ctx;

  const user = req.session.get('user');
  if (!user) {
    return {
      redirect: {
        destination: '/login?redirectTo=check',
        permanent: false,
      },
    };
  }
  const { token } = req.session.get('user');
  const api = `${process.env.API_URL}/orders/${ctx.query.oid}`;
  let { order } = await fetchJson({
    url: api,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    props: { order },
  };
});
export default product;
