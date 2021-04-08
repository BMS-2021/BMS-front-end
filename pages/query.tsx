import React, { ReactElement } from 'react';

import Template from '../Components/Template';
import Content from '../Components/Content';

export default function query(): ReactElement {
  return (
    <>
      <Template ContentComponent={<Content />} pageTitle={'查询图书'} />
    </>
  );
}
