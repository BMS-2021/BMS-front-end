import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme: Theme) =>
  createStyles({
    secondaryBar: {
      zIndex: 0,
    },
    menuButton: {
      marginLeft: -theme.spacing(1),
    },
    iconButtonAvatar: {
      padding: 4,
    },
    link: {
      textDecoration: 'none',
      color: lightColor,
      '&:hover': {
        color: theme.palette.common.white,
      },
    },
    button: {
      borderColor: lightColor,
    },
  });

interface HeaderProps extends WithStyles<typeof styles> {
  pageTitle: string;
  onDrawerToggle: () => void;
}

function Header(props: HeaderProps) {
  const { classes, pageTitle, onDrawerToggle } = props;

  const router = useRouter();

  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <AppBar color='primary' position='sticky' elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems='center'>
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <Button onClick={() => router.push('login')}>Login</Button>
            </Grid>
            <Grid item>
              <Tooltip title='Please Login First'>
                <IconButton
                  color='inherit'
                  className={classes.iconButtonAvatar}
                  onClick={() => router.push('login')}
                >
                  <Avatar src={null} alt='?' />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component='div'
        className={classes.secondaryBar}
        color='primary'
        position='static'
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems='center' spacing={1}>
            <Grid item xs>
              <Typography color='inherit' variant='h5' component='h1'>
                {pageTitle}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component='div'
        className={classes.secondaryBar}
        color='primary'
        position='static'
        elevation={0}
      >
        <Tabs value={0} textColor='inherit'>
          <Tab textColor='inherit' label='Users' />
          <Tab textColor='inherit' label='Sign-in method' />
          <Tab textColor='inherit' label='Templates' />
          <Tab textColor='inherit' label='Usage' />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

export default withStyles(styles)(Header);
