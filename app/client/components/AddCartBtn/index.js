import React from 'react';
import { Fab } from '@mui/material';
import { addProduct } from '../../redux/actions/cartActions';
import { openSnack } from '../../redux/actions/snackActions';
import { useDispatch } from 'react-redux';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
const index = ({ product, countInStock }) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addProduct(product));
    dispatch(openSnack());
  };

  return (
    <Fab
      sx={{
        position: 'absolute',
        top: -10,
        right: -10,
      }}
      size="small"
      color="secondary"
      aria-label="addtocart"
      onClick={addToCart}
    >
      <AddShoppingCartIcon fontSize="small" />
    </Fab>
  );
};

export default index;
