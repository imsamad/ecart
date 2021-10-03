import { IconButton, TableCell } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { incOrDec } from '../../redux/actions/cartActions';
import { Box } from '@mui/system';
export default function FlexDirection({ qty: proQty, inStock, productId }) {
  const cart = useSelector((state) => state.cart);
  const { incDecLoading, incDecProduct, incDecUpdatedQty } = cart;
  const dispatch = useDispatch();

  const [qty, setQty] = useState(proQty);

  const increment = () => dispatch(incOrDec(productId));

  const decrement = () => dispatch(incOrDec(productId, 'dec'));

  useEffect(() => {
    incDecProduct === productId && incDecUpdatedQty && setQty(incDecUpdatedQty);
  }, [incDecUpdatedQty]);

  return (
    <TableCell sx={{ position: 'relative', zIndex: 2 }}>
      <div style={{ width: 'min-content' }}>
        <Box
          sx={{
            display: 'flex',
            border: 0.1,
            flexDirection: 'row',
            bgcolor: 'background.paper',
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Box sx={{ borderRight: 0.1 }}>
            <IconButton disabled={qty === 1} onClick={decrement}>
              <RemoveIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              p: 1,
              alignSelf: 'stretch',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* {incDecLoading && incDecProduct === productId ? (
              <CircularProgress size={20} />
            ) : (
              qty
            )} */}
            {qty}
          </Box>
          <Box sx={{ borderLeft: 0.1 }}>
            <IconButton disabled={inStock === qty} onClick={increment}>
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      </div>
      {incDecLoading && incDecProduct === productId && (
        <Box
          sx={{
            position: 'absolute',
            cursor: 'progress',
            width: '100%',
            height: '100%',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 3,
          }}
        />
      )}
    </TableCell>
  );
}
const BB = () => (
  <Skeleton
    width="100%"
    height="100%"
    animation="wave"
    sx={{
      position: 'absolute',
      cursor: 'progress',
      width: '100%',
      height: '100%',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 4,
    }}
  />
);
