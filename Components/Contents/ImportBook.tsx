import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import neofetch from '../../utils/neofetch';
import { Snackbar, TextField, Button, Container } from '@material-ui/core';
import { useImmer } from 'use-immer';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: theme.spacing(3),
    padding: theme.spacing(4, 0, 4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme.shadows[6],
  },
  form: {
    width: '70%',
    margin: theme.spacing(3, 0, 1),
  },
  submit: {
    marginTop: theme.spacing(5),
    marginLeft: '40%',
    width: '20%',
    fontSize: theme.typography.fontSize * 1.1,
  },
}));

interface SnackState {
  open: boolean;
  message: string;
}

export default function ImportBook(): ReactElement {
  const classes = useStyles();

  const { handleSubmit, register, errors: inputError } = useForm();

  const [snackState, setSnackState] = useImmer<SnackState>({
    open: false,
    message: '',
  });

  const formParams = [
    { name: 'title', label: '书名', type: 'text' },
    { name: 'author', label: '作者', type: 'text' },
    { name: 'category', label: '类别', type: 'text' },
    { name: 'press', label: '出版社', type: 'text' },
    { name: 'year', label: '年份', type: 'number' },
    { name: 'price', label: '价格', type: 'text', pattern: /^\d+(\.\d+\d?)?$/ }, // TODO: check decimal
    { name: 'total', label: '总量', type: 'number' },
    { name: 'stock', label: '库存', type: 'number' },
  ];

  const onSubmit = async (formData: {
    author: string;
    category: string;
    press: string;
    price: number;
    stock: number;
    title: string;
    total: number;
    year: number;
  }): Promise<void> => {
    const { success, data } = await neofetch({
      url: '/book',
      method: 'PUT',
      jsonData: { ...formData },
      contentType: 'application/json',
    });

    if (!success) {
      setSnackState((draft) => {
        draft.open = true;
        draft.message = data as string;
      });
    } else {
      setSnackState((draft) => {
        draft.open = true;
        draft.message = 'Success!';
      });
    }
  };

  const formFields = formParams.map(({ name, label, pattern, ...rest }) => (
    <TextField
      key={name}
      variant='standard'
      margin='normal'
      required
      fullWidth
      id={name}
      label={label}
      name={name}
      inputRef={register({
        required: true,
        pattern,
      })}
      error={Boolean(inputError[name])}
      helperText={inputError[name] ? `请输入正确的${label}！` : null}
      {...rest}
    />
  ));

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackState.open}
        onClose={() =>
          setSnackState((draft) => {
            draft.open = false;
          })
        }
        autoHideDuration={2000}
        message={snackState.message}
        key={snackState.message}
      ></Snackbar>
      <Container maxWidth='sm' className={classes.container}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          {formFields}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            导入
          </Button>
        </form>
      </Container>
    </>
  );
}
