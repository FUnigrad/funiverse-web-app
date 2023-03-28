import { useAppCookies } from 'hooks';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { __DEV__ } from 'utils';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [cookies] = useAppCookies();

  const refreshToken = cookies.refreshToken;

  useEffect(() => {
    if (!refreshToken)
      window.location.href = __DEV__
        ? 'http://localhost:8000/verify'
        : process.env.NEXT_PUBLIC_LANDING_URL + 'verify';
  }, [refreshToken]);

  return <>{children}</>;
}

export default AuthGuard;
