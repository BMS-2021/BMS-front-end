import React from 'react';

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
  align?: 'right';
  format?: (value: number) => string;
}

export default function BookTable() {}
