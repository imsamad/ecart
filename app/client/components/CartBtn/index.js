import React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useSelector } from 'react-redux';
const index = () => {
  const { cartItems } = useSelector((state) => state.cart);

  let cartQty = 0;
  cartItems.forEach((c) => {
    cartQty += c.qty;
  });
  return (
    <IconButton
      sx={{
        border: 2,
        borderRadius: 2,
        borderColor: 'grey.50',
        color: 'grey.50',
      }}
      size="small"
    >
      <Badge badgeContent={`${Number(cartQty)}`} color="info">
        <ShoppingCartIcon fontSize="small" />
      </Badge>
    </IconButton>
  );
};

export default index;
