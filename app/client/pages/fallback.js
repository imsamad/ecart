import React from 'react';
import Typography from '@mui/material/Typography';
const fallback = () => {
  return (
    <>
      <Typography align="center" variant="h2" gutterBottom>
        Unable to connect to the Internet.
      </Typography>
      <Typography align="center" variant="h3" color="error">
        You are offline.
      </Typography>
    </>
  );
};

export default fallback;
