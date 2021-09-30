import { useSelector } from 'react-redux';
import React, { useCallback } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ProductRow from './ProductRow';
const index = () => {
  // console.log('Compo/cart/index');
  const { cart, loading } = useSelector((state) => state.cart);

  return (
    <TableContainer sx={{ userSelect: 'none' }}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
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
        <TableBody>
          {cart.productItems.map((product) => (
            <ProductRow product={product} key={product._id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default index;
