import React, { useState, useEffect } from 'react';
import neofetch from '../../utils/neofetch';
import BookTable, { BookData } from '../BookTable';

export default function QueryBook(): React.ReactElement {
  const [rows, setRows] = useState<BookData[]>([]);

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

  return (
    <>
      <BookTable rows={rows}></BookTable>
    </>
  );
}
