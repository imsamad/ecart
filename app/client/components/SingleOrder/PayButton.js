import { TableCell } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { payOrder } from '../../redux/actions/orderPayActions';
import PaypalBtn from '../PaypalBtn/App';

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

  if (isPaid !== orderPay.isPaid)
    return <TableCell colSpan={2}>Refresh Page</TableCell>;

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
