import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { useDispatch, useSelector } from 'react-redux';

import { getOrders } from '../../../redux/actions/myOrdersAction';
import OrderRow from './OrderRow';
export default function index() {
  const { orders, loading } = useSelector((state) => state.myOrders);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getOrders());
  }, []);
  const date = new Date(orders[0]?.createdAt);

  console.log('orde', date.getFullYear());
  const getDate = (val) => {
    let date = new Date(orders[0]?.createdAt);
    date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    return date;
  };
  // return 'ok';
  return (
    <Box
      sx={{ p: 1, border: 1, borderRadius: 2, borderColor: 'secondary.light' }}
    >
      <Typography align="center" gutterBottom variant="h6">
        My Orders
      </Typography>

      {loading || orders?.length === 0 ? (
        <LinearProgress />
      ) : (
        <TableContainer>
          <Table
            sx={{
              minWidth: 650,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>TOTAL</TableCell>
                <TableCell>PAID</TableCell>
                <TableCell>DELIVERED</TableCell>
                <TableCell>MANAGE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <OrderRow order={order} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
