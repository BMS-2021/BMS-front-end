import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import neofetch from '../../utils/neofetch';
import { Snackbar, TextField, Button } from '@material-ui/core';
import { useImmer } from 'use-immer';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
    { name: 'price', label: '价格', type: 'text', }, // TODO: check decimal
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

  const formFields = formParams.map(({ name, label, ...rest }) => (
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
      })}
      error={Boolean(inputError[name])}
      helperText={inputError[name] ? `${label}不能为空！` : null}
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
    </>
  );
}
