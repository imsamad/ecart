import React from 'react';
import { CircularProgress, Fab } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { addProduct } from '../../redux/actions/cartActions';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
const index = ({ product }) => {
  const { addLoading, addProduct: addProductId } = useSelector(
    ({ cart }) => cart
  );
  const dispatch = useDispatch();

  const addToCart = () => dispatch(addProduct(product));
  const isThis = addProductId === product;
  console.log('isThis', isThis);
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
      onClick={() => addToCart()}
    >
      {isThis && addLoading ? (
        <CircularProgress size={15} sx={{ color: '#fff' }} />
      ) : (
        <AddShoppingCartIcon fontSize="small" />
      )}
    </Fab>
  );
};

export default index;
