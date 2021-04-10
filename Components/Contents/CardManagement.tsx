import {
  Breadcrumbs,
  Typography,
  Link,
  Paper,
  TextField,
  makeStyles,
  MenuItem,
  Button,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import neofetch from '../../utils/neofetch';
import { requiredNotNull } from '../../utils/utils';

const useStyles = makeStyles((theme) => ({
  breadcrumb: {
    margin: theme.spacing(0, 5, 2),
  },
  container: {
    margin: 'auto',
    marginTop: theme.spacing(6),
    maxWidth: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 0, 6),
    paddingLeft: '20%',
    paddingRight: '20%',
  },
  textField: {
    margin: theme.spacing(2, 0, 2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

export default function CardManagement(): ReactElement {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, register, errors } = useForm();

  const [operation, setOperation] = useState<'+' | '-'>('+');

  const onInsert = async (insertData: {
    name: string;
    department: string;
    type: 'T' | 'O' | 'G' | 'U';
  }) => {
    const { success, data } = await neofetch({
      url: '/card',
      method: 'PUT',
      jsonData: {
        ...insertData,
      },
    });

    console.log(data);

    if (!success) {
      enqueueSnackbar(`添加失败, 错误信息: ${(data as unknown) as string}`);
    } else {
      enqueueSnackbar(
        `添加成功, 新卡片的卡号为: ${((data as unknown) as { id: number }).id}`
      );
    }
  };

  const onDelete = async ({ cardId }: { cardId: string }) => {
    // card id is number!

    const { success, data } = await neofetch({
      url: `/card?id=${cardId}`,
      method: 'DELETE',
    });

    // use snackbar to inform user
    if (!success) {
      enqueueSnackbar(`删除失败, 错误信息: ${data as string}`);
    } else {
      enqueueSnackbar('删除成功~');
    }
  };

  const links = [
    {
      key: 'ins',
      label: '添加借书证',
      onSelect: () => setOperation('+'),
    },
    {
      key: 'del',
      label: '删除借书证',
      onSelect: () => setOperation('-'),
    },
  ];

  const breadcrumbs = links.map(({ key, label, onSelect }) => (
    <Link key={key} color='inherit' onClick={onSelect}>
      {label}
    </Link>
  ));

  const cardType = [
    { mark: 'T', label: '教师' },
    { mark: 'U', label: '本科生' },
    { mark: 'G', label: '研究生' },
    { mark: 'O', label: '管理员' },
  ];

  const formFields = {
    '+': (
      <>
        <TextField
          variant='outlined'
          className={classes.textField}
          fullWidth
          id='name'
          name='name'
          label='姓名'
          type='text'
          inputRef={register(requiredNotNull)}
          error={errors.name}
          helperText={errors.name ? '姓名不能为空~' : null}
        />
        <TextField
          variant='outlined'
          className={classes.textField}
          fullWidth
          id='department'
          name='department'
          label='单位'
          type='text'
          inputRef={register(requiredNotNull)}
          error={errors.department}
          helperText={errors.department ? '单位不能为空~' : null}
        />
        <TextField
          variant='outlined'
          className={classes.textField}
          fullWidth
          select
          defaultValue=''
          id='type'
          label='类别'
          onChange={(e) => register({ name: 'type', value: e.target.value })}
          error={errors.type}
        >
          <MenuItem aria-label='None' value={''} />
          {cardType.map(({ mark, label }) => (
            <MenuItem key={mark} value={mark}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      </>
    ),
    '-': (
      <>
        <TextField
          variant='outlined'
          className={classes.textField}
          fullWidth
          id='cardId'
          name='cardId'
          label='卡号'
          inputRef={register({ ...requiredNotNull })}
          error={errors.cardId}
          helperText={errors.cardId ? '卡号不能为空~' : null}
        />
      </>
    ),
  };

  const mainForm = (
    <Paper elevation={3} className={classes.container}>
      <form
        onSubmit={
          operation === '+' ? handleSubmit(onInsert) : handleSubmit(onDelete)
        }
      >
        {formFields[operation]}
        <Button
          variant='contained'
          type='submit'
          color='primary'
          className={classes.button}
        >
          提交
        </Button>
      </form>
    </Paper>
  );

  return (
    <>
      <Breadcrumbs aria-label='breadcrumb' className={classes.breadcrumb}>
        <Typography color='textPrimary'>卡片管理</Typography>
        {breadcrumbs}
      </Breadcrumbs>
      {mainForm}
    </>
  );
}
