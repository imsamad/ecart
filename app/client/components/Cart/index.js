import React from 'react';
import { Typography, Table, TableContainer, Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import CartTableBody from './CartTableBody';
import CartTableHead from './CartTableHead';
import Invoice from './Invoice';
import cartDetails from '../../lib/cartDetails';

const index = ({ fromCheckoutPage }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const cartInvoice = cartDetails(cartItems);
  return cartItems.length === 0 ? (
    <Box
      sx={{
        maxWidth: 'sm',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Card Is Empty
      </Typography>
      <Link href="/">
        <Button color="info" variant="contained" size="small" disableElevation>
          Back To Shopping
        </Button>
      </Link>
    </Box>
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
