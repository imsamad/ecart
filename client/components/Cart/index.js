import React from "react";
import { Table, TableContainer, Box } from "@mui/material";
import { useSelector } from "react-redux";

import CartTableBody from "./CartTableBody";
import CartTableHead from "./CartTableHead";
import Invoice from "./Invoice";
import retriveCartInvoice from "../../lib/cartDetails";
import EmptyCart from "../EmptyCart";

const index = ({ fromCheckoutPage }) => {
  /**
   * fromCheckoutPage prop :- If true Checkout Button would not be shown
   */
  const { cartItems } = useSelector((state) => state.cart);
  const cartInvoice = retriveCartInvoice(cartItems);

  const hideAboveMd = { display: { sm: "block", md: "none" } };

  return cartItems.length === 0 ? (
    <EmptyCart />
  ) : (
    <Box sx={{ border: 1, borderRadius: 4, }}>
      <TableContainer>
        <Table sx={{ minWidth: "500px" }}>
          <CartTableHead />
          <CartTableBody
            cartItems={cartItems}
            fromCheckoutPage={fromCheckoutPage}
            cartInvoice={cartInvoice}
          />
        </Table>
      </TableContainer>
      <Box sx={hideAboveMd}>
        <Invoice
          cartInvoice={cartInvoice}
          fromCheckoutPage={fromCheckoutPage}
        />
      </Box>
    </Box>
  );
};

export default index;
