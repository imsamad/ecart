import { TableCell } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { payOrder } from '../../redux/actions/orderPayActions';

import dynamic from 'next/dynamic';

const PaypalBtn = dynamic(() => import('../PaypalBtn/App'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const PayButton = () => {
  const dispatch = useDispatch();
  const {
    id: orderId,
    totalPrice,
    isPaid,
  } = useSelector(({ order: { order } }) => order);
  const orderPay = useSelector(({ orderPay }) => orderPay);

  const onSuccess = (payResult) => {
    dispatch(payOrder(orderId, payResult));
  };
  // console.log('PaypalBtnPaypalBtn', PaypalBtn);
  return orderPay.isPaid || isPaid ? (
    <>
      <TableCell>Pay Status</TableCell>
      <TableCell>Paid</TableCell>
    </>
  ) : (
    <TableCell colSpan={2}>
      <PaypalBtn
        onSuccess={onSuccess}
        totalPrice={totalPrice}
        orderId={orderId}
      />
    </TableCell>
  );
};

export default PayButton;
