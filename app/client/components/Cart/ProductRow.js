import React, { useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import { Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/DeleteForever';

import ccyFmt from '../../lib/ccyFormat';
import AddIcon from '@mui/icons-material/Add';

import { useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  removeProduct,
} from '../../redux/actions/cartActions';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductRow = ({ product }) => {
  const dispatch = useDispatch();
  const remove = () => dispatch(removeProduct(product.product));
  const inc = () => dispatch(increment(product.product));
  const dec = () => dispatch(decrement(product.product));

  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Image
            width="100"
            height="100"
            src={`${product.image}`}
            layout="fixed"
          />
          <Stack>
            <Typography>{`${product.name}`}</Typography>
            <Typography>{`${product.price}`}</Typography>
            <Box sx={{ justifySelf: 'start' }}>
              <IconButton edge="start" color="error" onClick={remove}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Stack>
        </TableCell>

      <TableCell>
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
              <IconButton disabled={product.qty === 1} onClick={dec}>
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
              {`${product.qty}`}
            </Box>
            <Box sx={{ borderLeft: 0.1 }}>
              <IconButton
                disabled={product.countInStock === product.qty}
                onClick={inc}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </div>
      </TableCell>
      <TableCell align="right">
        {ccyFmt(product?.price * product.qty)}
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
