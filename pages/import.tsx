import React, { ReactElement } from 'react';

import Template from '../Components/Template';
// import Content from '../Components/Content';
import ImportBook from '../Components/Contents/ImportBook';

export default function borrow(): ReactElement {
  return (
    <>
      <Template
        ContentComponent={<ImportBook />}
        pageTitle={'导入图书'}
        loginRequired
      />
    </>
  );
}
