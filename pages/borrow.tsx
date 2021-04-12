import React, { ReactElement } from 'react';

import Template from '../Components/Template';
import BorrowBook from '../Components/Contents/BorrowBook';

export default function borrow(): ReactElement {
  return (
    <>
      <Template
        ContentComponent={<BorrowBook actionUrl={'/borrow'} />}
        pageTitle={'借阅图书'}
        loginRequired
      />
    </>
  );
}
