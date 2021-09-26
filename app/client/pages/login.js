import React, { useState } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Paper,
  TextField,
} from '@mui/material';
import useUser from '../lib/useUser';
import fetchJson from '../lib/fetchJson';
export default function LoginForm() {
  const { mutateUser } = useUser({
    redirectTo: '/profile',
    redirectIfFound: true,
  });
  const [email, setEmail] = useState('user@gmail.com');
  const [password, setPassword] = useState('123456');
  const handleSubmit = async () => {
    let body = { email, password };
    const axios = (url, data) => ({
      url: `${url}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    });
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      console.log('API_URL', API_URL);
      const data = await fetchJson(axios(`${API_URL}/auth/login`, body));
      mutateUser(await fetchJson(axios('/api/user', data)));
    } catch (error) {
      console.error("'An unexpected error happened:',");
      console.log(error);
    }
  };
  return (
    <Paper elevation={3} sx={{ maxWidth: 'sm', mx: 'auto' }}>
      <DialogTitle sx={{ textAlign: 'center' }}>{'Login'}</DialogTitle>
      <DialogContent>
        <Box sx={{ m: 1 }} component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            value={email}
            margin="normal"
            id="standard-basic"
            label="Email"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            value={password}
            fullWidth
            margin="normal"
            id="standard-basic"
            label="Password"
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={() => {}}>Cancel</Button>
      </DialogActions>
    </Paper>
  );
}
