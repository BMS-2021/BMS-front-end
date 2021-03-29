import React, { ReactElement } from 'react';

import Template from '../Components/Template';
import Content from '../Components/Content';

export default function returnBook(): ReactElement {
  return (
    <>
      <Template ContentComponent={<Content />} pageTitle={'归还图书'} />
    </>
  );
}
