import { TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
const CartTableHead = () => {
  // console.log('cart/CartTableHead');

  return (
    <TableHead>
      <TableRow>
        <TableCell colSpan={3} align="center">
          <Typography variant="h5">Products</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center" colSpan={2}>
          Details
        </TableCell>
        <TableCell align="right">Price</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Desc</TableCell>
        <TableCell align="left">Qty.</TableCell>
        <TableCell align="right">Sum</TableCell>
      </TableRow>
    </TableHead>
  );
};
export default React.memo(CartTableHead);
