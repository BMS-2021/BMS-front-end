import {
  Button,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import neofetch from '../../utils/neofetch';
import BookTable, { BookData } from '../BookTable';
import BookList from '../BookList';
import { useSnackbar } from 'notistack';
import { useImmer } from 'use-immer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'row',
    paddingLeft: '5%',
  },
  filterGrid: {
    margin: theme.spacing(0, 0, 0),
  },
  inline: {
    display: 'inline',
  },
  titleGrid: {
    margin: theme.spacing(0, 2, 3),
    padding: theme.spacing(0, 2, 0),
    justifyContent: 'space-between',
  },
  orderDiv: {
    marginLeft: theme.spacing(6),
  },
  orderSelect: {
    width: '15%',
    margin: theme.spacing(3, 3, 3),
  },
}));

const inputBox = [
  {
    type: 'text',
    box: [
      { name: 'title', label: '书名' },
      { name: 'author', label: '作者' },
      { name: 'category', label: '类别' },
      { name: 'press', label: '出版社' },
    ],
  },
  {
    type: 'number',
    box: [
      { name: 'yearMin', label: '开始年份' },
      { name: 'yearMax', label: '截止年份' },
      { name: 'priceMin', label: '最低价格' },
      { name: 'priceMax', label: '最高价格' },
    ],
  },
];

interface filterColumns {
  title?: string;
  author?: string;
  category?: string;
  press?: string;
  yearMin?: string; // should be numbers ↓
  yearMax?: string;
  priceMin?: string;
  priceMax?: string;
}

interface fetchParams {
  filter?: filterColumns;
  orderColumn?: string;
  orderDesc?: boolean;
}

export default function QueryBook(): React.ReactElement {
  const classes = useStyles();
  const [rows, setRows] = useState<BookData[]>([]);
  const [queryParams, setQueryParams] = useImmer<fetchParams>({
    orderColumn: 'id',
  });

  const { handleSubmit, register } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const getBookRows = async ({
    filter,
    orderColumn,
    orderDesc,
  }: fetchParams) => {
    console.log({ filter, orderColumn, orderDesc });

    let queryUrl = '/books?';
    for (const i of Object.entries(filter ?? {})) {
      const [k, v] = i;
      queryUrl += `${k}=${v}&`;
    }
    if (orderColumn) {
      queryUrl += `order=${orderColumn}&`;
      if (orderDesc !== undefined) {
        queryUrl += `desc=${orderDesc}&`;
      }
    }

    const { success, data } = await neofetch({ url: queryUrl });
    if (!success) {
      enqueueSnackbar(data as string);
    } else {
      setRows(data as BookData[]);
    }
  };

  useEffect(() => {
    (async () => {
      await getBookRows({});
    })();
  }, []);

  const onSubmit = async (filterData: filterColumns) => {
    setQueryParams((draft) => {
      draft.filter = { ...filterData };
    });

    getBookRows({ filter: filterData, ...queryParams });
  };

  const updateRows = async ({
    newColumn,
    newDesc,
  }: {
    newColumn?: string;
    newDesc?: boolean;
  }) => {
    setQueryParams((draft) => {
      if (newColumn) {
        draft.orderColumn = newColumn;
      }
      if (newDesc !== undefined) {
        draft.orderDesc = newDesc;
      }
    });

    // getBookRows(queryParams);
  };

  const formGrid = inputBox.map(({ type, box }) => (
    <Grid container spacing={3} key={type} className={classes.filterGrid}>
      {box.map(({ name, label }) => (
        <Grid item sm={3} className={classes.inline} key={name}>
          <TextField
            variant='outlined'
            id={name}
            name={name}
            label={label}
            type={type}
            size='small'
            inputRef={register()}
          />
        </Grid>
      ))}
    </Grid>
  ));

  const columnList = [
    ['id', '默认'],
    ['category', '类别'],
    ['title', '书名'],
    ['author', '作者'],
    ['press', '出版社'],
    ['year', '年份'],
    ['price', '价格'],
    ['total', '总量'],
    ['stock', '库存'],
  ].map((col) => {
    const [id, name] = col;
    return (
      <MenuItem key={id} value={id}>
        {name}
      </MenuItem>
    );
  });

  return (
    <>
      <Grid container className={classes.root}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container className={classes.titleGrid}>
            <Typography variant='h5'>筛选条件</Typography>
            <Button
              variant='outlined'
              color='primary'
              size='large'
              type='submit'
            >
              查询
            </Button>
          </Grid>
          {formGrid}
        </form>
      </Grid>
      <div className={classes.orderDiv}>
        <Select
          className={classes.orderSelect}
          id='column-select'
          onChange={(e) => updateRows({ newColumn: e.target.value as string })}
        >
          {columnList}
        </Select>
        <Select
          className={classes.orderSelect}
          id='desc-select'
          onChange={(e) => updateRows({ newDesc: e.target.value === 'true' })}
        >
          <MenuItem key={'t'} value={'true'}>
            降序
          </MenuItem>
          <MenuItem key={'f'} value={'false'}>
            升序
          </MenuItem>
        </Select>
        <Button variant='outlined' onClick={() => getBookRows(queryParams)}>
          排序
        </Button>
      </div>
      <BookTable rows={rows}></BookTable>
      <BookList rows={rows}></BookList>
    </>
  );
}
