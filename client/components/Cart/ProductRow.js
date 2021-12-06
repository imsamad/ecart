import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import { Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';

import ccyFmt from '../../lib/ccyFormat';

import {
  increment,
  decrement,
  removeProduct,
} from '../../redux/actions/cartActions';

import QtyCounter from './QtyCounter';
const ProductRow = ({ product }) => {
  const dispatch = useDispatch();
  const remove = () => dispatch(removeProduct(product.product));
  const inc = () => dispatch(increment(product.product));
  const dec = () => dispatch(decrement(product.product));
  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={2}>
          <div>
            <Image
              width={75}
              height={75}
              src={`${product.image}`}
              layout="fixed"
            />
          </div>
          <Stack>
            <Typography>{`${product.name}`}</Typography>
            <Typography>{`${product.price}`}</Typography>
            <Box sx={{ justifySelf: 'start' }}>
              <IconButton edge="start" color="error" onClick={remove}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>
        <QtyCounter
          decrement={dec}
          increment={inc}
          productQty={product.qty}
          countInStock={product.countInStock}
        />
      </TableCell>
      <TableCell align="right">
        {ccyFmt(product?.price * product.qty)}
      </TableCell>
    </TableRow>
  );
};

// export default React.memo(ProductRow);
export default ProductRow;
