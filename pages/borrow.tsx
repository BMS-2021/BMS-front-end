import React, { ReactElement } from 'react';

import Template from '../Components/Template';
import Content from '../Components/Content';

export default function borrow(): ReactElement {
  return (
    <>
      <Template ContentComponent={<Content />} pageTitle={'借阅图书'} />
    </>
  );
}
