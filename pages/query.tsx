import React, { ReactElement, useEffect, useState } from 'react';

import Template from '../Components/Template';
import QueryBook from '../Components/Contents/QueryBook';

export default function query(): ReactElement {
  return (
    <>
      <Template ContentComponent={<QueryBook />} pageTitle={'查询图书'} />
    </>
  );
}
