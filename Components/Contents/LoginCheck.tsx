import { Link } from '@material-ui/core';
import React, { ReactElement } from 'react';

import { getUserStateContext } from '../../utils/UserState';

export const DisplayMask = (): ReactElement => {
  return (
    <>
      Unauthorized! Please <Link href='/login'>Login</Link> First To Check This
      Page!
    </>
  );
};

export default function LoginCheck({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  const { state } = getUserStateContext();

  const displayContent = state.username ? children : <DisplayMask />;

  return <>{displayContent}</>;
}
