import React from 'react';
import Box from '@mui/material/Box';
import { Button, Grid, Typography } from '@mui/material';
import withSession from '../../lib/session';
import fetchJson from '../../lib/fetchJson';
import ProductDetails, {
  Details,
} from '../../components/Buy/ReviewOrder/ProductDetails';
import ShippingDetails from '../../components/Buy/ReviewOrder/ShippingDetails';
import PaymentDetails from '../../components/Buy/ReviewOrder/PaymentDetails';
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
      <Grid xs={12} item>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ overflow: 'auto' }}
        >
          Order ID:- 654v64rfv44
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={9}
        sx={{ p: 1, border: '0.1px solid rgba(0,0,0,0.1)' }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={6} sx={{ p: 2 }}>
            <Box sx={{ border: 1, p: 2, borderRadius: 4 }}>
              <ShippingDetails />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} sx={{ p: 2 }}>
            <Box sx={{ border: 1, p: 2, borderRadius: 4 }}>
              <PaymentDetails />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ px: 2 }}>
          <Typography variant="h6" gutterBottom>
            Orders Items
          </Typography>
          <ProductDetails cartItems={orderItems} fromOrder />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4} md={3} sx={{ px: 1 }}>
        <Box
          sx={{
            border: '0.1px solid rgba(0,0,0,0.1)',
            p: 1,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" align="center" sx={{ mb: 2 }}>
            Order Summary
          </Typography>
          <Details cartItems={orderItems} />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            disableElevation
          >
            Pay
          </Button>
        </Box>
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
