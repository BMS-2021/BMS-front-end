import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import neofetch from '../../utils/neofetch';
import BookTable, { BookData } from '../BookTable';

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'row',
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

export default function QueryBook(): React.ReactElement {
  const classes = useStyles();
  const [rows, setRows] = useState<BookData[]>([]);

  const { handleSubmit, register } = useForm();

  useEffect(() => {
    (async () => {
      const { success, data } = await neofetch({ url: '/books' });
      if (!success) {
        //TODO: solve get books error..
      } else {
        setRows(data as BookData[]);
      }
    })();
  }, []);

  const onSubmit = async (filterData: {
    title?: string;
    author?: string;
    category?: string;
    press?: string;
    yearMin?: string; // should be numbers ↓
    yearMax?: string;
    priceMin?: string;
    priceMax?: string;
  }) => {
    let queryUrl = '/books',
      hasKey = false;

    if (filterData) {
      queryUrl += '?';
    }

    Object.entries(filterData).forEach(([key, value]) => {
      if (value) {
        if (hasKey) queryUrl += '&';
        queryUrl += `${key}=${value}`;
        hasKey = true;
      }
    });

    const { success, data } = await neofetch({
      url: queryUrl,
    });
    if (!success) {
      //TODO: solve get books error..
    } else {
      setRows(data as BookData[]);
    }
  };

  const formGrid = inputBox.map(({ type, box }) => (
    <Grid container spacing={3} key={type} className={classes.filterGrid}>
      {box.map(({ name, label }) => (
        <Grid item xs={3} className={classes.inline} key={name}>
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

  return (
    <>
      <Grid container>
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
      <BookTable rows={rows}></BookTable>
    </>
  );
}
