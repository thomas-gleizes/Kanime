import React, { createContext, useCallback, useEffect, useState } from 'react';

import LocalStorageService from 'services/localStorage.service';
import { ApiService } from 'services/api.service';
import { useBrowser, useContextFactory } from 'hooks';
import { routes } from 'resources/routes';
import toast from 'utils/toastr';
import { AuthenticationApi } from 'api';

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
    if (isBrowser) {
      const refresh = () => AuthenticationApi.refresh();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, token, isLogin, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
