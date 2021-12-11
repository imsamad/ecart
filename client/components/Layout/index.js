import Box from '@mui/system/Box';
import Container from '@mui/material/Container';
import Copyright from '../Copyright';
import Header from '../Header';
import SnackBar from '../SnackBar';
import { SnackbarProvider } from 'notistack';

const index = (props) => {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'grey.100',
      }}
    >
      <Box>
        <Header />
      </Box>
      {/* flexGrow: 1,//To push copyright at bottom  */}
      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <SnackbarProvider maxSnack={3}>
          <SnackBar />
          <Container fixed sx={{border:0,p:1}} >{props.children}</Container>
        </SnackbarProvider>
      </Box>
      <Box>
        <Copyright />
      </Box>
    </Box>
  );
};

export default index;
