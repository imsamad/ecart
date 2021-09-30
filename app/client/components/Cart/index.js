import React from 'react';
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Divider,
  TableRow,
} from '@mui/material';
import { useSelector } from 'react-redux';

import ProductRow from './ProductRow';
import Invoice from './Invoice';
import cartDetails from '../../lib/cartDetails';
import NextButton from './NextButton';

const index = ({ fromSelect }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { subTotal, shippingPrice, taxPrice, total } = cartDetails(cartItems);
  return cartItems.length === 0 ? (
    <Typography variant="h6" align="center">
      Card Is Empty
    </Typography>
  ) : (
    <Grid container sx={{ border: 1, borderRadius: 4, p: 2 }}>
      <Grid xs={12} item>
        <Typography variant="h5" align="center">
          {fromSelect ? 'Select Products' : 'Your Cart'}
        </Typography>
        <Divider sx={{ my: 2 }} />
        {/* <Box sx={{ border: 2 }}> */}
        {/* <NextButton /> */}
        {/* </Box> */}
        <TableContainer>
          <Table sx={{ minWidth: '500px' }}>
            <TableHead>
              {/* <TableRow>
                <TableCell align="center" colSpan={3}>
                  <Typography variant="h5" align="center">
                    {fromSelect ? 'Select Products' : 'Your Cart'}
                  </Typography>
                </TableCell>
              </TableRow> */}

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
              {cartItems.map((product) => (
                <ProductRow product={product} key={product.product} />
              ))}
              <TableRowModified>
                <TableCell sx={{ border: 0 }} />
                <TableCell>Subtotal</TableCell>
                <TableCell align="right">{subTotal}</TableCell>
              </TableRowModified>
              <TableRowModified>
                <TableCell sx={{ border: 0 }} />
                <TableCell>Tax</TableCell>
                <TableCell align="right">{taxPrice}</TableCell>
              </TableRowModified>
              <TableRowModified>
                <TableCell sx={{ border: 0 }} />
                <TableCell>Shipping</TableCell>
                <TableCell align="right">{shippingPrice}</TableCell>
              </TableRowModified>
              <TableRowModified>
                <TableCell sx={{ border: 0 }} />
                <TableCell>Total</TableCell>
                <TableCell align="right">{total}</TableCell>
              </TableRowModified>
              {!fromSelect && (
                <TableRowModified>
                  <TableCell sx={{ border: 0 }} />
                  <TableCell colSpan={2}>
                    <NextButton />
                  </TableCell>
                </TableRowModified>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid xs={12} sx={{ display: { sm: 'block', md: 'none' } }} item>
        <Invoice
          subTotal={subTotal}
          total={total}
          shippingPrice={shippingPrice}
          taxPrice={taxPrice}
          fromSelect={fromSelect}
        />
      </Grid>
    </Grid>
  );
};

const TableRowModified = ({ children }) => (
  <TableRow sx={{ display: { xs: 'none', sm: 'none', md: 'table-row' } }}>
    {children}
  </TableRow>
);

export default index;
