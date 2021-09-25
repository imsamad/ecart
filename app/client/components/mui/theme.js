import { createTheme } from '@mui/material/styles';
// Create a theme instance.
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      mxs: 300, //mid of xs+xm
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
