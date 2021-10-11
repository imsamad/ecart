import Box from '@mui/system/Box';
import Container from '@mui/material/Container';
import Copyright from '../Copyright';
import Header from '../Header';
// import UIContextProvider from '../../UICtx';

const index = (props) => {
  return (
    //  <UIContextProvider>
    <Box
      sx={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box>
        <Header />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Container fixed>
          <h1>{props.children}</h1>
        </Container>
      </Box>
      <Box>
        <Copyright />
      </Box>
    </Box>
    //  </UIContextProvider>
  );
};

export default index;
