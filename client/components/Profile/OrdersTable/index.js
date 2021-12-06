import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import { getOrders } from "../../../redux/actions/myOrdersAction";
import OrderRow from "./OrderRow";

export default function index() {
  const { orders, loading } = useSelector((state) => state.myOrders);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <Box
      sx={{
        border: 1,
        borderRadius: 2,
        borderColor: "secondary.light",
        overflow: "hidden",
      }}
    >
      <Box sx={{ height: 4, bgcolor: "secondary.main" }} />
      <Box sx={{ p: 1 }}>
        <Typography align="center" gutterBottom variant="h6">
          My Orders
        </Typography>

        {loading ? (
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
                {orders.length ? (
                  orders.map((order) => (
                    <OrderRow order={order} key={order.id} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography align="center" gutterBottom variant="h6">
                        No order exist.{" "}
                        <Link href="/">
                          <Button color="info" variant="contained" size="small">
                            Back To Shopping
                          </Button>
                        </Link>
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}
