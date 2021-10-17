import React from 'react';
import { Typography, Table, TableContainer, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import CartTableBody from './CartTableBody';
import CartTableHead from './CartTableHead';
import Invoice from './Invoice';
import cartDetails from '../../lib/cartDetails';

const index = ({ fromCheckoutPage }) => {
  // console.log('cart/index');
  const { cartItems } = useSelector((state) => state.cart);
  const cartInvoice = cartDetails(cartItems);
  return cartItems.length === 0 ? (
    <Typography variant="h6" align="center">
      Card Is Empty
    </Typography>
  ) : (
    <Box sx={{ border: 1, borderRadius: 4, p: 1 }}>
      <TableContainer>
        <Table sx={{ minWidth: '500px' }}>
          <CartTableHead />
          <CartTableBody
            cartItems={cartItems}
            fromCheckoutPage={fromCheckoutPage}
            cartInvoice={cartInvoice}
          />
        </Table>
      </TableContainer>
      <Box sx={{ display: { sm: 'block', md: 'none' } }}>
        <Invoice
          cartInvoice={cartInvoice}
          fromCheckoutPage={fromCheckoutPage}
        />
      </Box>
    </Box>
  );
};

export default index;
