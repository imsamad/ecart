import React, { useState } from 'react';
import { CircularProgress, Fab } from '@mui/material';

import addProduct from '../../lib/addToCart';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
const index = ({ product }) => {
  const [loader, setLoader] = useState(false);
  const addToCart = () => addProduct(product, setLoader);

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
      {loader ? (
        <CircularProgress size={15} sx={{ color: '#fff' }} />
      ) : (
        <AddShoppingCartIcon fontSize="small" />
      )}
    </Fab>
  );
};

export default index;
