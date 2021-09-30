import React from 'react';
import { Paper, Typography, Divider, Grid, Button } from '@mui/material';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import withSession from '../lib/session';
import fetchJson from '../lib/fetchJson';
const buy = () => {
  return (
    <Paper>
      <Box sx={{ width: '100%', border: 0.1, p: 4 }}>
        <Typography align="center" variant="h4" sx={{}}>
          Select a delivery address.
        </Typography>
        <Divider sx={{ my: 4 }} />
        <Grid container spacing={2}>
          <Address />
          <Address />
          <Address />
          <Address />
          <Address />
          <Address />
          <Address />
        </Grid>
      </Box>
    </Paper>
  );
};
const Address = () => (
  <Grid item xs={12} sm={6}>
    <Box sx={{ p: 2, border: 1, borderRadius: 4 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        Abdus Samad
      </Typography>
      <Typography variant="body2">Raipur,Gagalehri road</Typography>
      <Typography variant="body2">
        Before Jagdamba Indian Petrol Pump
      </Typography>
      <Typography variant="body2">BHAGWANPUR, UTTARAKHAND</Typography>
      <Typography variant="body2">247661</Typography>
      <Typography variant="body2">INDIA</Typography>
      <Box sx={{ maxWidth: '50%' }}>
        <Button
          size="small"
          variant="contained"
          disableElevation
          fullWidth
          startIcon={<DeliveryDiningIcon />}
        >
          Deliver To This Addresss
        </Button>
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', flexGrow: 1, my: 1 }}>
          <Button
            disableElevation
            variant="contained"
            size="small"
            fullWidth
            startIcon={<EditIcon />}
            sx={{ mr: 2 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="small"
            fullWidth
            disableElevation
            startIcon={<DeleteIcon />}
            sx={{ ml: 2 }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  </Grid>
);
export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get('user');
  if (!user) {
    return {
      redirect: {
        destination: '/login?redirectTo=buy',
        permanent: false,
      },
    };
  }
  const api = process.env.API_URL + '/address';
  const { token } = req.session.get('user');
  let address = await fetchJson({
    url: api,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('address from backend', address);
  return {
    props: {
      data: [1, 2, 3, 4],
    },
  };
});
export default buy;
