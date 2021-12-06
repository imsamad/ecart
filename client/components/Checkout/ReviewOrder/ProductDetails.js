import React from 'react';
import { Typography, Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ccyFormat from '../../../lib/ccyFormat';
import OrderInvoice from './OrderInvoice';

function Products({ cartItems, fromSingleOrderPage }) {
  return (
    <Box>
      <TableContainer>
        <Table
          sx={{
            minWidth: 400,
            border: 1,
            borderColor: 'grey.400',
            overflow: 'auto',
          }}
        >
          <TableHead>
            <TableCell variant="head" align="center" colSpan={3}>
              <Typography variant="h5" gutterBottom align="center">
                Order summary
              </Typography>
            </TableCell>
          </TableHead>
          <TableBody>
            {cartItems.map((product) => (
              <TableRow key={product.product}>
                <TableCell>
                  <Avatar alt={`${product.slug}`} src={`${product.image}`} />
                </TableCell>
                <TableCell>
                  <Typography>{product.name}</Typography>{' '}
                  <Typography>
                    {`$${Number(product.price)} * ${Number(product.qty)}`}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {`${ccyFormat(
                      (Number(product.price) * Number(product.qty)).toFixed(2)
                    )}`}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!fromSingleOrderPage && <OrderInvoice cartItems={cartItems} />}
    </Box>
  );
}
export default Products;
