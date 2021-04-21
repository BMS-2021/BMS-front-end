import React, { ReactElement } from 'react';

import Template from '../Components/Template';
import BorrowBook from '../Components/Contents/BorrowBook';

export default function borrow(): ReactElement {
  return (
    <>
      <Template
        ContentComponent={
          <BorrowBook actionText={'还'} actionUrl={'/return'} />
        }
        pageTitle={'归还图书'}
        loginRequired
      />
    </>
  );
}
