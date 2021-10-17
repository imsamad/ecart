import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import Link from 'next/link';

import useUser from '../../lib/useUser';
import fetchJson from '../../lib/fetchJson';
import { useRouter } from 'next/router';
// import { useUICtx } from '../../UICtx';

import CartBtn from '../CartBtn';
export default function ButtonAppBar() {
  // const { login } = useUICtx();
  const { user, mutateUser } = useUser();
  const router = useRouter();
  const logout = async () => {
    mutateUser(await fetchJson({ url: '/api/logout', method: 'POST' }), false);
    router.push('/login');
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">
              <a style={{ textDecoration: 'none', color: 'inherit' }}>e-Cart</a>
            </Link>
          </Typography>
          <Link href="/cart">
            <a>
              <CartBtn />
            </a>
          </Link>
          {user && user?.email ? (
            <Tooltip title="Logout">
              <Button
                onClick={logout}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  textTransform: 'none',
                }}
              >
                {user.email || user.username || 'Logout'}
              </Button>
            </Tooltip>
          ) : (
            <Button color="inherit">
              <Link href="/login">
                <a style={{ textDecoration: 'none', color: 'inherit' }}>
                  Login
                </a>
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {/*To Offest from Top in case of fixed Header */}
      <Toolbar />
    </Box>
  );
}
