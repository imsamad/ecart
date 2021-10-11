import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const index = () => {
  return (
    <Box sx={{ width: '100%', p: 4 }}>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="body1" align="center">
        Copyright eCart@2020
      </Typography>
    </Box>
  );
};

export default index;
