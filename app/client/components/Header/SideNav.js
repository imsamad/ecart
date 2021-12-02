import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListSubheader, Typography } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import NextLink from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FaceIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from "@mui/icons-material/Login";

export default function SideBarNav({ open, toggleDrawer, user, logout }) {
  const lisItems =
    user && user?.email
      ? [
          { label: "Cart", icon: <ShoppingCartIcon />, href: "/cart" },
          { label: "Profile", icon: <FaceIcon />, href: "/profile" },
        ]
      : [{ label: "Login", icon: <LoginIcon />, href: "/login" }];
  const list = (
    <Box
      sx={{
        width: 250,
      }}
      role="navbar"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List
        subheader={
          <ListSubheader inset={true}>
            <CardActionArea>
              <NextLink href="/">
                <Typography
                  variant="h6"
                  component="h1"
                  color="primary.light"
                  sx={{ py: 1 }}
                >
                  e-Cart.
                </Typography>
              </NextLink>
            </CardActionArea>
          </ListSubheader>
        }
      >
        <Divider />
        {lisItems.map((item) => (
          <React.Fragment key={item.label}>
            <NextLink href={item.href}>
              <ListItem button key={item.label}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            </NextLink>
          </React.Fragment>
        ))}
        {user && user?.email && (
          <ListItem button key="logout" onClick={logout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      {list}
    </Drawer>
  );
}
