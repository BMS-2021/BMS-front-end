import React, { ReactElement } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';
import { getUserStateContext } from '../utils/UserState';
import { useSnackbar } from 'notistack';
import Head from 'next/head';
import { requiredNotNull } from '../utils/utils';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(): ReactElement {
  const classes = useStyles();
  const router = useRouter();

  const { handleSubmit, register, errors: inputError } = useForm();

  const { dispatch } = getUserStateContext();

  const { enqueueSnackbar } = useSnackbar();

  const onLogin = async ({
    adminId,
    password,
  }: {
    adminId: string;
    password: string;
  }): Promise<void> => {
    const postData = {
      name: adminId,
      password: password,
      // rem: remember,
    };

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status >= 400 && response.status < 500) {
        const errMsg = await response.text();

        enqueueSnackbar(
          response.status === 403 ? '用户名或密码错误, 请重试~' : errMsg
        );
      } else {
        enqueueSnackbar('登录异常, 请重新尝试或联系管理员~');
      }
    } else {
      dispatch({
        type: 'login',
        username: adminId,
      });

      router.back();
    }
  };

  return (
    <>
      <Head>
        <title>登录 - 图书管理系统</title>
      </Head>
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit(onLogin)}
            >
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='adminId'
                label='Admin ID'
                name='adminId'
                autoComplete='admin-id'
                autoFocus
                inputRef={register(requiredNotNull)}
                error={Boolean(inputError.adminId)}
                helperText={inputError.adminId ? 'Please Input Admin ID' : null}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                inputRef={register(requiredNotNull)}
                error={Boolean(inputError.password)}
                helperText={
                  inputError.password ? 'Please Input Admin Password' : null
                }
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Sign In
              </Button>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
