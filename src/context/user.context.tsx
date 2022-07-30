import React, { createContext, useCallback, useEffect, useState } from 'react';

import { AuthenticationApi } from 'api';
import { useBrowser, useContextFactory } from 'hooks';
import { useLayoutContext } from 'context/layout.context';
import LocalStorageService from 'services/localStorage.service';
import { MINUTE } from 'resources/constants';

export declare type UserContext = {
  isLogin: boolean;
  user: User;
  token: string;
  signIn: (user: User, token: string) => void;
  signOut: () => void;
};

interface Props {
  children: ReactNode;
}

const UserContext = createContext<UserContext>({} as any);

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useUserContext = useContextFactory<UserContext>(UserContext);

const UserContextProvider: React.FunctionComponent<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(LocalStorageService.getUser());
  const [token, setToken] = useState<string>(LocalStorageService.getToken());
  const [isLogin, setIsLogin] = useState<boolean>(!!user);

  const { isInactive } = useLayoutContext();

  const isBrowser = useBrowser();

  const signIn = useCallback((user: User, token: string): void => {
    LocalStorageService.saveUser(user);
    LocalStorageService.saveToken(token);

    setUser(user);
    setToken(token);
    setIsLogin(true);
  }, []);

  const signOut = useCallback((fetching: boolean = true): void => {
    fetching && AuthenticationApi.signOut();

    LocalStorageService.clearUser();
    setIsLogin(false);
    setUser(null);
    setToken(null);
  }, []);

  useEffect(() => {
    if (isBrowser && isLogin && !isInactive) {
      AuthenticationApi.refresh()
        .then(() => null)
        .catch(() => null);
    }
  }, [isBrowser]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLogin && isBrowser && !isInactive)
        AuthenticationApi.refresh()
          .then(() => null)
          .catch(() => null);
    }, MINUTE * 15);

    return () => clearInterval(interval);
  }, [isLogin, isBrowser, isInactive]);

  useEffect(() => {
    if (isBrowser && isLogin) {
      const listener = (event) => {
        if (event.data.content === 'unconnected') signOut(false);
      };

      window.addEventListener('message', listener);

      return () => window.removeEventListener('message', listener);
    }
  }, [isBrowser, isLogin]);

  return (
    <UserContext.Provider value={{ user, token, isLogin, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
