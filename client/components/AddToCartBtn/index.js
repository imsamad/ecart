import React from "react";
import { Button, Fab } from "@mui/material";
import { useDispatch } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "next/router";
import { addProduct } from "../../redux/actions/cartActions";
import { openSnack } from "../../redux/actions/snackActions";

import ShopIcon from "@mui/icons-material/Shop";
const index = ({ product, buy }) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const addToCart = async () => {
    await dispatch(addProduct(product));
    !buy && dispatch(openSnack());
    buy && router.push("/cart");
  };

  return !buy ? (
    <Fab
      sx={{
        position: "absolute",
        top: -10,
        right: -10,
      }}
      size="small"
      color="secondary"
      aria-label="addtocart"
      onClick={addToCart}
    >
      <AddShoppingCartIcon fontSize="small" />
    </Fab>
  ) : (
    <Button
      variant="contained"
      color="secondary"
      size="small"
      startIcon={<ShopIcon />}
      onClick={addToCart}
    >
      Buy
    </Button>
  );
};

export default index;
