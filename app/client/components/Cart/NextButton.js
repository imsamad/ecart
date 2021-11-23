import { Button } from "@mui/material";
import React from "react";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const NextButton = () => {
  return (
    <Link href="/checkout">
      <Button
        endIcon={<NavigateNextIcon />}
        fullWidth
        variant="contained"
        color="secondary"
      >
        Checkout
      </Button>
    </Link>
  );
};

export default NextButton;
