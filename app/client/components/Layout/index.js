import Box from '@mui/system/Box';
import Container from '@mui/material/Container';

import Header from '../Header';
// import UIContextProvider from '../../UICtx';

const index = (props) => {
  return (
    //  <UIContextProvider>
    <Box sx={{ overflow: 'hidden' }}>
      <Header />
      <Box sx={{ mt: 4 }} />
      <Container fixed>
        <h1>{props.children}</h1>
      </Container>
    </Box>
    //  </UIContextProvider>
  );
};

export default index;
