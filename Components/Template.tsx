import React, { ReactElement, useEffect } from 'react';
import {
  ThemeProvider,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from '../Components/Navigator';
import Header from '../Components/Header';
import Copyright from '../Components/Copyright';
import styles, { drawerWidth, theme } from './templateStyle';
import Head from 'next/head';
import LoginCheck from './LoginCheck';
import { getUserStateContext } from '../utils/UserState';
import neofetch from '../utils/neofetch';

export interface PaperbaseProps extends WithStyles<typeof styles> {
  ContentComponent: ReactElement;
  pageTitle: string;
  loginRequired?: boolean;
}

function Template(props: PaperbaseProps): ReactElement {
  const { classes, ContentComponent, pageTitle, loginRequired } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { state, dispatch } = getUserStateContext();

  useEffect(() => {
    (async () => {
      if (!state.username) {
        const { success, data } = await neofetch({ url: '/login' });
        if (!success) {
          alert(data);
        } else {
          dispatch({
            type: 'login',
            username: (data as { name: string }).name,
          });
        }
      }
    })();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const innerContent = loginRequired ? (
    <LoginCheck>{ContentComponent}</LoginCheck>
  ) : (
    ContentComponent
  );

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{pageTitle + ' - 图书管理系统'}</title>
      </Head>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation='js'>
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              navName='图书管理系统'
              variant='temporary'
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation='css'>
            <Navigator
              navName='图书管理系统'
              PaperProps={{ style: { width: drawerWidth } }}
            />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header pageTitle={pageTitle} onDrawerToggle={handleDrawerToggle} />
          <main className={classes.main}>{innerContent}</main>
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default withStyles(styles)(Template);
