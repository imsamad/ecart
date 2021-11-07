import { Grid, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';

import ShippingDetails from './ShippingDetails';
import PaymentDetails from './PaymentDetails';
import OrderInvoice from './OrderInvoice';
import ProductDetails from './ProductDetails';

const product = () => {
  const { order } = useSelector((state) => state.order);
  return (
    <Grid container>
      <Grid xs={12} item>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ overflow: 'auto' }}
        >
          Order ID:- {order.id}
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
              <ShippingDetails order={order} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} sx={{ p: 2 }}>
            <Box sx={{ border: 1, p: 2, borderRadius: 4, height: '100%' }}>
              <PaymentDetails order={order} />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ px: 2 }}>
          <ProductDetails order={order} />
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
          <OrderInvoice order={order} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default product;
