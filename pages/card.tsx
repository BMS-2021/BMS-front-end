import React, { ReactElement } from 'react';

import Template from '../Components/Template';
import Content from '../Components/Content';

export default function borrow(): ReactElement {
  return (
    <>
      <Template
        ContentComponent={<Content />}
        pageTitle={'卡片管理'}
        loginRequired
      />
    </>
  );
}
