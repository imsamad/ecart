import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import NextButton from './NextButton';
import { Typography } from '@mui/material';
import QtyCounter from './QtyCounter';
import { IconButton } from '@mui/material';

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}
import DeleteIcon from '@mui/icons-material/DeleteForever';
import { Box } from '@mui/system';

export default function SpanningTable({ products, details }) {
  return (
    <TableContainer sx={{ userSelect: 'none' }}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="left">Qty.</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id} sx={{}}>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Image
                    width="100"
                    height="100"
                    src={product.product.image}
                  ></Image>
                  <Stack>
                    <Typography>{product?.product.name}</Typography>
                    <Typography>{product?.product.price}</Typography>
                    <Box sx={{ justifySelf: 'start' }}>
                      <IconButton edge="start" color="error">
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
            </TableRow>
          ))}

          <TableRowModified>
            <TableCell rowSpan={4} />
            <TableCell>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(details.itemsPrice)}</TableCell>
          </TableRowModified>
          <TableRowModified>
            <TableCell>Tax</TableCell>

            <TableCell align="right">{ccyFormat(details.taxPrice)}</TableCell>
          </TableRowModified>
          <TableRowModified>
            <TableCell>Shipping</TableCell>
            <TableCell align="right">
              {ccyFormat(details.shippingPrice)}
            </TableCell>
          </TableRowModified>
          <TableRowModified>
            <TableCell>Total</TableCell>
            <TableCell align="right">{ccyFormat(details.totalPrice)}</TableCell>
          </TableRowModified>

          <TableRowModified>
            <TableCell colSpan={3}>
              <NextButton />
            </TableCell>
          </TableRowModified>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
const TableRowModified = ({ children }) => (
  <TableRow sx={{ display: { xs: 'none', sm: 'none', md: 'table-row' } }}>
    {children}
  </TableRow>
);
