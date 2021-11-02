import React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
const api = process.env.NEXT_PUBLIC_API_URL;
const index = () => {
  const router = useRouter();
  const { token } = router.query;

  const [error, setError] = React.useState(null);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const tokenUrl = `${api}/auth/confirmemail?token=${token}`;
    const validate = async () => {
      try {
        setLoading(true);
        const { data } = await axios(tokenUrl);
        router.replace('/login');
      } catch (err) {
        setError('Invalid Token');
        setLoading(false);
      }
    };
    validate();
  }, [token]);
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '70vh',
      }}
    >
      <Typography variant="h3" align="center">
        Confirm Email
      </Typography>
      <Box
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading && (
          <>
            <CircularProgress color="secondary" />
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>
              Confirming...
            </Typography>
          </>
        )}
        {error && (
          <Alert severity="error" variant="filled" sx={{ p: 4 }}>
            <AlertTitle>Error</AlertTitle>

            <Typography>{error}</Typography>
            <Button
              variant="contained"
              color="info"
              onClick={() => router.replace('/login')}
              disableElevation
              sx={{ my: 2 }}
            >
              Login
            </Button>
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default index;
