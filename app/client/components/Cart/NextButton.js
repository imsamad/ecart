import { Button } from '@mui/material';
import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const NextButton = () => {
  return (
    <Button
      endIcon={<NavigateNextIcon />}
      size="large"
      fullWidth
      variant="contained"
      color="secondary"
    >
      Checkout
    </Button>
  );
};

export default NextButton;
