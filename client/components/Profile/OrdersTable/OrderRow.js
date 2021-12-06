import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { Button } from '@mui/material';

import Link from 'next/link';

import Tooltip from '@mui/material/Tooltip';

import CancelIcon from '@mui/icons-material/Cancel';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import ccyFormat from '../../../lib/ccyFormat';
import ManageOrder from './ManageOrder';
const OrderRow = ({ order }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <TableRow
      key={order.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Tooltip title={order.id}>
          <span>
            <Link href={`/order/${order.id}`}>
              {order.id.substring(0, 5) + '...'}
            </Link>
          </span>
        </Tooltip>
      </TableCell>
      {/* <TableCell>{getDate(order.createdAt)}</TableCell> */}
      <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
      <TableCell>{ccyFormat(order.totalPrice)}</TableCell>
      <TableCell align="center">
        {order.isPaid ? (
          <CheckCircleIcon size="small" color="info" />
        ) : (
          <CancelIcon size="small" color="error" />
        )}
      </TableCell>
      <TableCell align="center">
        {order.isDelivered ? (
          <CheckCircleIcon size="small" color="info" />
        ) : (
          <CancelIcon size="small" color="error" />
        )}
      </TableCell>
      <TableCell>
        <Button size="small" onClick={handleClickOpen}>
          Manage
        </Button>
      </TableCell>
      <ManageOrder
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        order={order}
      />
    </TableRow>
  );
};

export default OrderRow;
