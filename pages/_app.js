/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import { SnackbarProvider } from 'notistack';
import React from 'react';
import '../styles/globals.css';
import UserState from '../utils/UserState';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <SnackbarProvider
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        maxSnack={1}
        autoHideDuration={1500}
      >
        <UserState>
          <Component {...pageProps} />
        </UserState>
      </SnackbarProvider>
    </>
  );
}

export default MyApp;
