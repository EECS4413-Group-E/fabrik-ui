import { type ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { refreshUser, registerUnauthorizedHandler } from '../Api.ts';
import { parseJWT } from '../utils.ts';
import { tokenStore } from '../tokenStore.ts';
import { router } from '../router.ts';

interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(tokenStore.peek());
  const [parsedToken, setParsedToken] = useState<TokenPayload | null>(
    accessToken ? parseJWT<TokenPayload>(accessToken).payload : null,
  );
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!accessToken;

  // Keep React state in sync whenever tokenStore changes (from interceptor OR elsewhere)
  useEffect(() => {
    tokenStore.subscribe((token) => {
      setAccessToken(token);
      setParsedToken(token ? parseJWT<TokenPayload>(token).payload : null);
    });
  }, []);

  // Handle forced logout from interceptor
  useEffect(() => {
    registerUnauthorizedHandler(() => {
      router.navigate({ to: '/login' });
    });
  }, []);

  // Initial silent refresh on mount
  useEffect(() => {
    const silentRefresh = async () => {
      try {
        const { accessToken } = await refreshUser();
        tokenStore.set(accessToken); // triggers the subscription above
      } catch {
        tokenStore.set(null);
      } finally {
        setLoading(false);
      }
    };

    silentRefresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, role: parsedToken?.role || '', isLoggedIn, loading, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
