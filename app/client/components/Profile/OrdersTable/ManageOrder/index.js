import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import { Box } from '@mui/system';
import Link from 'next/link';

const PaypalBtn = dynamic(() => import('../../../PaypalBtn'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

import { getOrders } from '../../../../redux/actions/myOrdersAction';
import { payOrder } from '../../../../redux/actions/orderPayActions';
const index = ({ open, handleClose, order }) => {
  const dispatch = useDispatch();
  const onSuccess = async (payResult) => {
    await dispatch(payOrder(order.id, payResult));
    handleClose();
    await dispatch(getOrders());
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Manage Order</DialogTitle>

      {!order.isPaid && (
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" align="center" gutterBottom>
            Pay Now
          </Typography>
          <PaypalBtn
            onSuccess={onSuccess}
            totalPrice={order.totalPrice}
            orderId={order.id}
          />
        </Box>
      )}
      <DialogActions>
        <Button onClick={handleClose}>
          <Link href={`/order/${order.id}`}>
            <a style={{ textDecoration: 'none', color: 'inherit' }}>View</a>
          </Link>
        </Button>
        <Button onClick={handleClose}> Close </Button>
      </DialogActions>
    </Dialog>
  );
};

export default index;
