import React from 'react';
import { Grid } from '@mui/material';

import ProfileForm from './ProfileForm';
import AddressForm from './AddressForm';

const MyAccount = () => {
  return (
    <Grid container>
      <Grid item sx={12} md={4} sx={{ p: 1 }}>
        <ProfileForm />
      </Grid>
      <Grid item sx={12} md={8} sx={{ p: 1 }}>
        <AddressForm />
      </Grid>
    </Grid>
  );
};
export default MyAccount;
