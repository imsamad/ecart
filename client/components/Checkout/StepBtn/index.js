import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import ReloadIcon from '@mui/icons-material/Cached';
import placeOrder from '../../../lib/placeOrder';

const index = ({ handleNext, handleBack, fromReview }) => {
  const cart = useSelector((state) => state.cart);
  const router = useRouter();
  const redirect = (oid) => router.replace(`/order/${oid}`);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const handleClick = async () => {
    if (!fromReview) handleNext();
    else {
      setLoading(true);
      await placeOrder(cart, redirect, setErr);
      setLoading(false);
    }
  };
  const resetSteps = () => {
    setErr(null);
    router.reload();
  };
  return (
    <Box sx={{ mb: 2 }}>
      {fromReview && err && <AlertMsg resetSteps={resetSteps} err={err} />}
      <div>
        <LoadingButton
          loading={loading}
          disabled={loading}
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleClick}
          sx={{ mt: 1, mr: 1 }}
        >
          {fromReview ? 'Placeorder' : 'Continue'}
        </LoadingButton>
        <Button
          disabled={loading}
          color="error"
          size="small"
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

const AlertMsg = ({ resetSteps, err }) => {
  return (
    <Alert
      severity="error"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={resetSteps}
        >
          <ReloadIcon fontSize="inherit" />
        </IconButton>
      }
      sx={{ mb: 2 }}
    >
      {err}
    </Alert>
  );
};

export default index;
