import { UserRole } from '@types';
import { assert } from 'console';
import { Cookies } from 'react-cookie';
import { __DEV__ } from 'utils';
export const CookieNames = {
  AccessToken: 'accessToken',
  RefreshToken: 'refreshToken',
} as const;
export interface DecodedToken {
  role: UserRole;
  domain: string;
  username: string;
  sub: string;
  iat: number;
  exp: number;
}
export const appCookies = (function () {
  const cookies = new Cookies();
  return {
    setAccessToken: (token: string) =>
      cookies.set(CookieNames.AccessToken, token, {
        domain: __DEV__ ? 'localhost' : process.env.REACT_APP_PUBLIC_DOMAIN,
      }),
    getAccessToken: (): string | null => cookies.get(CookieNames.AccessToken),
    getRefreshToken: () => cookies.get(CookieNames.RefreshToken),
    getDecodedAccessToken: (): DecodedToken | null => {
      const token = cookies.get(CookieNames.AccessToken);
      try {
        return JSON.parse(atob(token.split('.')[1])) as DecodedToken;
      } catch (e) {
        return null;
      }
    },
    clearAll: () => {
      const defaultOption = { domain: __DEV__ ? 'localhost' : process.env.REACT_APP_PUBLIC_DOMAIN };
      cookies.remove(CookieNames.AccessToken, defaultOption);
      cookies.remove(CookieNames.RefreshToken, defaultOption);
    },
  };
})();
