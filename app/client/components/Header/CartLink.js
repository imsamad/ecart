import React from 'react';
// import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NavLink from './NavLink';
// import { useSelector } from 'react-redux';
const index = () => {
  // const { cartItems } = useSelector((state) => state.cart);

  // let cartQty = 0;
  // cartItems.forEach((c) => {
  //   cartQty += c.qty;
  // });
  return (
    <NavLink>
      {/* <Badge badgeContent={`${Number(cartQty)}`} color="info"> */}
      <ShoppingCartIcon fontSize="small" />
      {/* </Badge> */}
    </NavLink>
  );
};

export default index;
