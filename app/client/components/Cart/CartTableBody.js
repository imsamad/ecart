import { TableBody, TableCell, TableRow } from '@mui/material';
import NextButton from './NextButton';
import ProductRow from './ProductRow';
const CartTableBody = ({
  cartItems,
  fromCheckoutPage,
  cartInvoice: { subTotal, total, shippingPrice, taxPrice },
}) => {
  // console.log('cart/CartTableBody');

  return (
    <TableBody>
      {cartItems.map((product) => (
        <ProductRow product={product} key={product.product} />
      ))}
      <TableRowModified>
        <TableCell sx={{ border: 0 }} />
        <TableCell>Subtotal</TableCell>
        <TableCell align="right">{subTotal}</TableCell>
      </TableRowModified>
      <TableRowModified>
        <TableCell sx={{ border: 0 }} />
        <TableCell>Tax</TableCell>
        <TableCell align="right">{taxPrice}</TableCell>
      </TableRowModified>
      <TableRowModified>
        <TableCell sx={{ border: 0 }} />
        <TableCell>Shipping</TableCell>
        <TableCell align="right">{shippingPrice}</TableCell>
      </TableRowModified>
      <TableRowModified>
        <TableCell sx={{ border: 0 }} />
        <TableCell>Total</TableCell>
        <TableCell align="right">{total}</TableCell>
      </TableRowModified>
      {!fromCheckoutPage && (
        <TableRowModified>
          <TableCell sx={{ border: 0 }} />
          <TableCell colSpan={2}>
            <NextButton from="CartTableBody" />
          </TableCell>
        </TableRowModified>
      )}
    </TableBody>
  );
};
const TableRowModified = ({ children }) => (
  <TableRow sx={{ display: { xs: 'none', sm: 'none', md: 'table-row' } }}>
    {children}
  </TableRow>
);
export default CartTableBody;
