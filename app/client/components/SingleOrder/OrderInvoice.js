import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import cartDetails from '../../lib/cartDetails';
import PayButton from './PayButton';
const OrderInvoice = ({ order }) => {
  const { subTotal, shippingPrice, taxPrice, total } = cartDetails({
    orderInvoice: order,
  });

  return (
    <Box>
      <TableContainer>
        <Table sx={{ minWidth: 250 }}>
          <TableHead>
            <TableRow>
              <TableCell variant="head" align="center" colSpan={2}>
                <Typography variant="h6"> Invoice</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell>{subTotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Shipping</TableCell>
              <TableCell>{shippingPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TaxPrice</TableCell>
              <TableCell>{taxPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>{total}</TableCell>
            </TableRow>
            <TableRow>
              <PayButton />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default OrderInvoice;
