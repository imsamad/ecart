import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import NextButton from './NextButton';

export default function Invoice({
  cartInvoice: { subTotal, total, shippingPrice, taxPrice },
  fromCheckoutPage,
}) {
  // console.log('cart/Invoice');
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={3} align="center">
              Invoice
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2}>Subtotal</TableCell>

            <TableCell align="right">{subTotal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell>7%</TableCell>
            <TableCell align="right">{taxPrice}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Shipping</TableCell>
            <TableCell align="right"> {shippingPrice}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right"> {total}</TableCell>
          </TableRow>
          {!fromCheckoutPage && (
            <TableRow>
              <TableCell colSpan={3}>
                <NextButton from="invoice" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
