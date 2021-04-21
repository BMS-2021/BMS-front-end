// import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';
import { Paper, Typography } from '@material-ui/core';

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
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  paper: {
    width: '100%',
    overflowX: 'scroll',
    flexShrink: 0,
  },
  tableCell: {
    width: '25%',
  },
  leftText: {
    width: '50%',
    textAlign: 'left',
    display: 'inline-block',
  },
  rightText: {
    width: '50%',
    textAlign: 'right',
    display: 'inline-block',
  },
  boldText: {
    width: '50%',
    fontWeight: 'bold',
  },
  smallText: {
    color: '#666666',
    fontSize: theme.typography.fontSize * 0.97,
  },
}));

const BookListCell = ({
  id,
  title,
  author,
  category,
  press,
  year,
  price,
  total,
  stock,
}: BookData): ReactElement => {
  const classes = useStyles();

  return (
    <TableCell>
      <Typography className={classes.leftText}>{`#${id}`}</Typography>
      <Typography className={classes.rightText}> </Typography>
      <Typography className={`${classes.leftText} ${classes.boldText}`}>
        {title}
      </Typography>
      <Typography className={`${classes.rightText}`}>{category}</Typography>
      <Typography className={`${classes.leftText} ${classes.smallText}`}>
        {author}
      </Typography>
      <Typography className={`${classes.rightText} ${classes.smallText}`}>
        {year},{press}
      </Typography>
      <Typography className={classes.leftText}>价格: {price}</Typography>
      <Typography className={classes.rightText}>
        {stock}/{total}
      </Typography>
    </TableCell>
  );
};

export default function BookList({
  rows,
}: {
  rows: BookData[];
}): React.ReactElement {
  const classes = useStyles();

  return (
    <Paper>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant='h5'>图书列表</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                <BookListCell {...row} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
