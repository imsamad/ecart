import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  Tooltip,
  IconButton,
} from '@mui/material';
import Link from 'next/link';
import FaceIcon from '@mui/icons-material/Face';
import useUser from '../../lib/useUser';
import fetchJson from '../../lib/fetchJson';
import { useRouter } from 'next/router';
// import { useUICtx } from '../../UICtx';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdminIcon from '@mui/icons-material/AdminPanelSettings';
import CartLink from './CartLink';
import NavLink from './NavLink';
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
              <CartLink />
            </a>
          </Link>

          {user && user?.email ? (
            <>
              <Link href="/profile">
                <a
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <NavLink>
                    <Tooltip title="Go To Profile">
                      <FaceIcon fontSize="small" />
                    </Tooltip>
                  </NavLink>
                </a>
              </Link>

              <Link href="/admin">
                <a
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <NavLink>
                    <Tooltip title="Go To Admin">
                      <AdminIcon fontSize="small" />
                    </Tooltip>
                  </NavLink>
                </a>
              </Link>

              <NavLink onClick={logout}>
                <Tooltip title="Logout">
                  <ExitToAppIcon fontSize="small" />
                </Tooltip>
              </NavLink>
            </>
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
    </>
  );
}
