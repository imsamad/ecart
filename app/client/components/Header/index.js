import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import useUser from '../../lib/useUser';
import fetchJson from '../../lib/fetchJson';
import { useRouter } from 'next/router';
// import { useUICtx } from '../../UICtx';

export default function ButtonAppBar() {
  // const { login } = useUICtx();
  const { user, mutateUser } = useUser();
  const router = useRouter();
  const logout = async () => {
    mutateUser(await fetchJson({ url: '/api/logout', method: 'POST' }), false);
    router.push('/login');
  };
  return (
    <>
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
                <a style={{ textDecoration: 'none', color: 'inherit' }}>
                  e-Cart
                </a>
              </Link>
            </Typography>
            <Link href="/cart">
              <a>
                <IconButton
                  sx={{
                    border: 2,
                    borderRadius: 2,
                    borderColor: 'grey.50',
                    color: 'grey.50',
                  }}
                  size="small"
                >
                  <ShoppingCartIcon fontSize="small" />
                </IconButton>
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
      </Box>
      <Toolbar />
    </>
  );
}
