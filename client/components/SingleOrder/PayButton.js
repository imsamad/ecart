import { TableCell } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import dynamic from "next/dynamic";

const PaypalBtn = dynamic(() => import("../PaypalBtn"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
import { payOrder } from "../../redux/actions/orderPayActions";

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
  console.log("PaypalBtnPaypalBtn", PaypalBtn);
  return orderPay.isPaid || isPaid ? (
    <>
      <TableCell>Pay Status</TableCell>
      <TableCell>
        <CheckCircleIcon size="small" color="info" />
      </TableCell>
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
