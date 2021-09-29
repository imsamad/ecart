import React, { useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import { Typography, LinearProgress } from '@mui/material';
import QtyCounter from './QtyCounter';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/DeleteForever';

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../redux/actions/cartActions';

const ProductRow = ({ product }) => {
  const { remLoading, remProduct, remStatus } = useSelector(({ cart }) => cart);

  const dispatch = useDispatch();
  const remove = () => dispatch(deleteProduct(product.product._id));
  const isThisRow = remProduct === product.product._id;
  return isThisRow && !remLoading && remStatus ? (
    ''
  ) : (
    <TableRow sx={{ position: 'relative', zIndex: 6 }}>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Image width="100" height="100" src={product.product.image}></Image>
          <Stack>
            <Typography>{product?.product.name}</Typography>
            <Typography>{product?.product.price}</Typography>
            <Box sx={{ justifySelf: 'start' }}>
              <IconButton edge="start" color="error" onClick={remove}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Stack>
        </Stack>
      </TableCell>

      <QtyCounter
        productId={product.product._id}
        qty={product.qty}
        inStock={product.product.countInStock}
      />
      <TableCell align="right">
        {ccyFormat(product?.product.price * product.qty)}
      </TableCell>
      {isThisRow && remLoading && (
        <Box
          sx={{
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 7,
            height: '100%',
            cursor: 'progress',
          }}
        >
          <LinearProgress />
        </Box>
      )}
    </TableRow>
  );
};

export default ProductRow;
