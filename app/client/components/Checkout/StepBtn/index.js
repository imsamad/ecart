import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';

import placeOrder from '../../../lib/placeOrder';

const index = ({ handleNext, handleBack, fromReview }) => {
  const cart = useSelector((state) => state.cart);
  const router = useRouter();
  const redirect = (oid) => router.replace(`/order/${oid}`);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    if (!fromReview) handleNext();
    else {
      setLoading(true);
      await placeOrder(cart, redirect);
    }
  };
  return (
    <Box sx={{ mb: 2 }}>
      <div>
        <LoadingButton
          loading={loading}
          disabled={loading}
          variant="contained"
          color="secondary"
          onClick={handleClick}
          sx={{ mt: 1, mr: 1 }}
        >
          {fromReview ? 'Placeorder' : 'Continue'}
        </LoadingButton>
        <Button
          disabled={loading}
          color="error"
          variant="contained"
          onClick={handleBack}
          sx={{ mt: 1, mr: 1 }}
        >
          Back
        </Button>
      </div>
    </Box>
  );
};

export default index;
