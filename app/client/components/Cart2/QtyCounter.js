import { IconButton, Stack, TableCell } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { incOrDec } from '../../redux/actions/cartActions';
import { Box } from '@mui/system';

const QtyCounter = ({
  qty: proQty,
  inStock,
  productId,
  incDecLoading,
  incDecSucess,
  incDecProduct,
  incDecUpdatedQty,
}) => {
  const dispatch = useDispatch();

  const [qty, setQty] = useState(proQty);

  const increment = () => dispatch(incOrDec(productId));

  const decrement = () => dispatch(incOrDec(productId, 'dec'));

  useEffect(() => {
    incDecProduct === productId && incDecUpdatedQty && setQty(incDecUpdatedQty);
  }, [incDecUpdatedQty]);

  return (
    <TableCell align="left" sx={{ position: 'relative' }}>
      {incDecLoading && incDecProduct === productId ? (
        <Skeleton width="40px" height="80px" />
      ) : (
        <Stack justifyItems="start" sx={{ border: 4 }}>
          <Stack
            spacing={1}
            alignItems="center"
            direction="row"
            sx={{
              border: 0,
              py: 2,
              bgcolor: 'rgba(0,0,0,0.5)',
              boxShadow: 2,
              cursor: 'no-drop',
            }}
          >
            <IconButton
              size="small"
              disabled={inStock === qty}
              onClick={increment}
            >
              <AddIcon />
            </IconButton>
            <Box sx={{ userSelect: 'none' }}>{qty}</Box>
            <IconButton
              variant="outlined"
              size="small"
              disabled={qty === 1}
              onClick={decrement}
            >
              <RemoveIcon />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </TableCell>
  );
};

export default QtyCounter;
