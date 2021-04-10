import React, { ReactElement } from 'react';

import Template from '../Components/Template';
// import Content from '../Components/Content';
import CardManagement from '../Components/Contents/CardManagement';

export default function borrow(): ReactElement {
  return (
    <>
      <Template
        ContentComponent={<CardManagement />}
        pageTitle={'卡片管理'}
        loginRequired
      />
    </>
  );
}
