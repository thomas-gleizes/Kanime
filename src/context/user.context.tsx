import React, { createContext, useCallback, useEffect, useState } from 'react';

import { AuthenticationApi } from 'api';
import { useBrowser, useContextFactory } from 'hooks';
import LocalStorageService from 'services/localStorage.service';
import { MINUTE } from 'resources/constants';

export declare type UserContext = {
  isLogin: boolean;
  user: User;
  token: string;
  signIn: (user: User, token: string) => void;
  signOut: () => Promise<void>;
};

interface Props {
  children: React.ReactNode;
}

const UserContext = createContext<UserContext>(null);

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useUserContext = useContextFactory<UserContext>(UserContext);

const UserContextProvider: React.FunctionComponent<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(LocalStorageService.getUser());
  const [token, setToken] = useState<string>(LocalStorageService.getToken());
  const [isLogin, setIsLogin] = useState<boolean>(!!user);

  const isBrowser = useBrowser();

  const signIn = useCallback((user: User, token: string): void => {
    LocalStorageService.saveUser(user);
    LocalStorageService.saveToken(token);

    setUser(user);
    setToken(token);
    setIsLogin(true);
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    await AuthenticationApi.signOut();

    LocalStorageService.clearUser();
    setIsLogin(false);
    setUser(null);
    setToken(null);
  }, []);

  useEffect(() => {
    if (isBrowser && isLogin) {
      AuthenticationApi.refresh().then(console.log).catch(console.error);
    }
  }, [isBrowser]);

  useEffect(() => {
    if (isLogin && isBrowser) {
      const interval = setInterval(
        () => AuthenticationApi.refresh().then(console.log).catch(console.error),
        MINUTE * 15
      );

      return () => clearInterval(interval);
    }
  }, [isLogin, isBrowser]);

  return (
    <UserContext.Provider value={{ user, token, isLogin, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
