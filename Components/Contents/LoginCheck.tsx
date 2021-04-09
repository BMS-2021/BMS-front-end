import { Link } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import neofetch from '../../utils/neofetch';

import { getUserStateContext } from '../../utils/UserState';

export const DisplayMask = (): ReactElement => {
  const router = useRouter();

  return (
    <>
      Unauthorized! Please{' '}
      <Link onClick={() => router.push('/login')}>login</Link> to browse this
      page!
    </>
  );
};

export default function LoginCheck({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { state, dispatch } = getUserStateContext();

  const displayContent = state.username ? children : <DisplayMask />;

  /* check if logined */
  // useEffect(() => {
  //   (async () => {
  //     if (!state.username) {
  //       const { success, data } = await neofetch({ url: '/login' });
  //       if (!success) return;
  //       else {
  //         dispatch({
  //           type: 'login',
  //           username: (data as { username: string }).username,
  //         });
  //       }
  //     }
  //   })();
  // }, [state.username]);

  return <>{displayContent}</>;
}
