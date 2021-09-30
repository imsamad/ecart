import React from 'react';
import { Fab } from '@mui/material';

// import addProduct from '../../lib/addToCart';
import { addProduct } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
const index = ({ product }) => {
  const dispatch = useDispatch();
  // const [loader, setLoader] = useState(false);
  const addToCart = () => dispatch(addProduct(product));

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
      {/* {loader ? (
        <CircularProgress size={15} sx={{ color: '#fff' }} />
      ) : (
        <AddShoppingCartIcon fontSize="small" />
      )} */}
    </Fab>
  );
};

export default index;
