import React, { ReactElement, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import neofetch from '../../utils/neofetch';
import { TextField, Button, Container } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { requiredNotNull } from '../../utils/utils';
import UploadFileModal from '../UploadFileModal';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: theme.spacing(3),
    padding: theme.spacing(4, 0, 4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    boxShadow: theme.shadows[6],
  },
  form: {
    width: '70%',
    margin: theme.spacing(3, 0, 1),
  },
  button: {
    width: '40%',
    marginLeft: '30%',
    marginTop: theme.spacing(5),
    fontSize: theme.typography.fontSize * 1.1,
  },
  fileWrapper: {
    width: '100%',
  },
  fileButton: {
    width: '40%',
    marginLeft: '30%',
    marginTop: theme.spacing(2),
  },
}));

export default function ImportBook(): ReactElement {
  const classes = useStyles();

  const { handleSubmit, register, errors: inputError } = useForm();

  const { enqueueSnackbar } = useSnackbar();

  const formParams = [
    { name: 'title', label: '书名', type: 'text' },
    { name: 'author', label: '作者', type: 'text' },
    { name: 'category', label: '类别', type: 'text' },
    { name: 'press', label: '出版社', type: 'text' },
    { name: 'year', label: '年份', type: 'number' },
    { name: 'price', label: '价格', type: 'text', pattern: /^\d+(\.\d+\d?)?$/ }, // TODO: check decimal
    { name: 'total', label: '总量', type: 'number' },
  ];

  const onSubmit = async (formData: {
    author: string;
    category: string;
    press: string;
    title: string;
    // actually numbers ↓
    price: string;
    total: string;
    year: string;
  }): Promise<void> => {
    for (const prop in formData) {
      formData[prop] = (formData[prop] as string).trim();
      if ((formData[prop] as string).length < 1) {
        enqueueSnackbar('不可以只输入空白值哟~');
        return;
      }
    }

    const jsonData = {
      ...formData,
      price: Number(formData.price),
      total: Number(formData.total),
      year: Number(formData.year),
    };

    const { success, data } = await neofetch({
      url: '/book',
      method: 'PUT',
      jsonData: jsonData,
    });

    if (!success) {
      enqueueSnackbar(data as string);
    } else {
      enqueueSnackbar('导入成功~');
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
        ...requiredNotNull,
        pattern,
      })}
      error={Boolean(inputError[name])}
      helperText={inputError[name] ? `请输入正确的${label}！` : null}
      {...rest}
    />
  ));

  const [fileModalOpen, setFileModalOpen] = useState(false);

  return (
    <>
      <Container maxWidth='sm' className={classes.container}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          {formFields}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
          >
            导入
          </Button>
        </form>
        <div className={classes.fileWrapper}>
          <Button
            variant='text'
            className={classes.fileButton}
            onClick={() => setFileModalOpen(true)}
          >
            从文件批量导入...
          </Button>
        </div>
      </Container>
      <UploadFileModal
        classes={null}
        id={'file'}
        keepMounted={false}
        open={fileModalOpen}
        onClose={() => setFileModalOpen(false)}
      />
    </>
  );
}
