import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/system/Box';
import { CacheProvider } from '@emotion/react';
import theme from '../components/mui/theme';
import { Provider } from 'react-redux';

import createEmotionCache from '../components/mui/createEmotionCache';
import { useStore } from '../redux/store';
import Header from '../components/Header';
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  let store;
  if (pageProps?.reduxData) {
    const { reducerName, fieldName } = pageProps.reduxData;
    const redux = {
      [reducerName]: {
        [fieldName]: pageProps.data,
      },
    };
    store = useStore(redux);
  } else {
    store = useStore(undefined);
  }
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>e-Cart</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Header />
          <Box sx={{ mt: 4 }} />
          <Container fixed>
            <Component {...pageProps} />
          </Container>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
