import React from 'react';
import { Grid, Typography } from '@mui/material';

import ProfileForm from './ProfileForm';
import OrdersTable from './OrdersTable';

const index = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        My Profile
      </Typography>
      <Grid container>
        <Grid item xs={12} md={4} sx={{ p: 1 }}>
          <ProfileForm />
        </Grid>
        <Grid item xs={12} md={8} sx={{ p: 1 }}>
          <OrdersTable />
        </Grid>
      </Grid>
    </>
  );
};

export default index;
