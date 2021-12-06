import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const index = ({ keyword }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          m: 'auto',
          border: 4,
          p: 2,
          borderColor: 'info.main',
          borderRadius: 2,
        }}
      >
        <Typography variant="h2">Hmmmm...</Typography>
        <Typography variant="body1">
          We could not find any matches for "{keyword}"
        </Typography>
      </Box>
    </Box>
  );
};

export default index;
