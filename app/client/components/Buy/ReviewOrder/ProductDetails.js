import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';
import ccyFormat from '../../../lib/ccyFormat';
import cartDetails from '../../../lib/cartDetails';

function ProductDetails({ cartItems }) {
  const { subTotal, shippingPrice, taxPrice, total } = cartDetails(cartItems);
  return (
    <List sx={{ border: 1, borderColor: 'grey.400' }}>
      {cartItems.map((product) => (
        <React.Fragment key={product.id}>
          <ListItem key={product.id}>
            <ListItemAvatar>
              <Avatar alt={`${product.slug}`} src={`${product.image}`}></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`$${Number(product.price)} * ${Number(product.qty)}`}
            />
            <Typography variant="body2">{`${ccyFormat(
              (Number(product.price) * Number(product.qty)).toFixed(2)
            )}`}</Typography>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
      <ListItem>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1">{subTotal}</Typography>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Shipping" />
        <Typography variant="subtitle1">{shippingPrice}</Typography>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Tax (0.7)" />
        <Typography variant="subtitle1">{taxPrice}</Typography>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1">{total}</Typography>
      </ListItem>
    </List>
  );
}

export default ProductDetails;
