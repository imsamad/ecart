import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NextButton from './NextButton';
function ccyFormat(num) {
  return `$${num.toFixed(2)}`;
}
export default function SpanningTable({ details }) {
  return (
    <TableContainer>
      <Table aria-label="spanning table">
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

            <TableCell align="right">{ccyFormat(details.itemsPrice)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell>7%</TableCell>
            <TableCell align="right">{details.taxPrice}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Shipping</TableCell>
            <TableCell align="right"> {details.shippingPrice}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right"> {details.totalPrice}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>
              <NextButton />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
