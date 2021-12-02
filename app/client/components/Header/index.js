import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import FaceIcon from "@mui/icons-material/Person";

import useUser from "../../lib/useUser";
import fetchJson from "../../lib/fetchJson";
import CartLink from "./CartLink";
import NavLink from "./NavLink";
import { Box } from "@mui/system";
import SideBarNav from "./SideNav";
export default function ButtonAppBar() {
  const { user, mutateUser } = useUser();
  const [sideNav, setSideNav] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSideNav(open);
  };
  const router = useRouter();
  const logout = async () => {
    mutateUser(await fetchJson({ url: "/api/logout", method: "POST" }), false);
    router.push("/login");
  };
  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 700 }}
          >
            <Link href="/">
              <a
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                e-Cart
              </a>
            </Link>
          </Typography>
          <Box
            sx={{
              display: { xs: "flex", mxs: "flex", sm: "none", md: "none" },
            }}
          >
            <IconButton
              onClick={toggleDrawer(true)}
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: { xs: "none", mxs: "none", sm: "flex", md: "flex" },
            }}
          >
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
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <NavLink>
                      <Tooltip title="Go To Profile">
                        <FaceIcon fontSize="small" />
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
                  <a style={{ textDecoration: "none", color: "inherit" }}>
                    Login
                  </a>
                </Link>
              </Button>
            )}
          </Box>
          <SideBarNav
            open={sideNav}
            toggleDrawer={toggleDrawer}
            user={user}
            logout={logout}
          />
        </Toolbar>
      </AppBar>
      {/*To Offest from Top in case of fixed Header */}
      <Toolbar />
    </>
  );
}
