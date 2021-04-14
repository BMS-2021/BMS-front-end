// import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Paper } from '@material-ui/core';

interface Column {
  id:
    | 'title'
    | 'author'
    | 'category'
    | 'press'
    | 'year'
    | 'price'
    | 'total'
    | 'stock';
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'title', label: '书名', minWidth: 100, maxWidth: 250 },
  { id: 'author', label: '作者', minWidth: 70, maxWidth: 100 },
  { id: 'category', label: '类别' },
  { id: 'press', label: '出版社' },
  { id: 'year', label: '年份' },
  { id: 'price', label: '价格' },
  { id: 'total', label: '总量' },
  { id: 'stock', label: '库存' },
];

export interface BookData {
  id: number;
  title: string;
  author: string;
  category: string;
  press: string;
  year: number;
  price: number;
  total: number;
  stock: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  paper: {
    width: '90%',
    marginTop: theme.spacing(2),
    marginLeft: '5%',
  },
}));

export default function BookTable({
  rows,
}: {
  rows: BookData[];
}): React.ReactElement {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(({ id, label, align }) => (
                <TableCell key={id} align={align}>
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                {columns.map(({ id, align }) => (
                  <TableCell key={id} align={align}>
                    {row[id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
