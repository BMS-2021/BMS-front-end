import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';
import { getUserStateContext } from '../utils/UserState';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme: Theme) =>
  createStyles({
    secondaryBar: {
      zIndex: 0,
      paddingBottom: theme.spacing(1),
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

  const { state, dispatch } = getUserStateContext();

  const router = useRouter();

  const displayAvatar = state.username ?? '?';
  const tooltipText = state.username
    ? `Hello, ${state.username}`
    : 'Please login first!';
  const buttonText = state.username ? 'Log Out' : 'Log In';

  const logInOutAction = (): void => {
    if (!state.username) {
      router.push('login');
    } else {
      dispatch({
        type: 'logout',
      });
    }
  };

  return (
    <React.Fragment>
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
              <Button onClick={logInOutAction}>{buttonText}</Button>
            </Grid>
            <Grid item>
              <Tooltip title={tooltipText}>
                <IconButton
                  color='inherit'
                  className={classes.iconButtonAvatar}
                >
                  <Avatar src={null} alt={displayAvatar} />
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
    </React.Fragment>
  );
}

export default withStyles(styles)(Header);
