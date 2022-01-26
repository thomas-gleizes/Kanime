import React, { createContext, useCallback, useEffect, useState } from 'react';

import { User } from '@types';
import { useContextFactory } from '@hooks';
import LocalStorage from '@services/localStorage';
import appAxios from '@lib/api/appAxios';
import { routes } from '@lib/constants';
import toast from '@helpers/toastr';

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
  const [user, setUser] = useState<User>(LocalStorage.getUser());
  const [token, setToken] = useState<string>(LocalStorage.getToken());
  const [isLogin, setIsLogin] = useState<boolean>(!!user);

  const signIn = useCallback((user: User, token: string): void => {
    LocalStorage.saveUser(user);
    LocalStorage.saveToken(token);

    setUser(user);
    setToken(token);
    setIsLogin(true);
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    await appAxios.get(`${routes.authentification}/logout`);
    LocalStorage.clearUser();
    setIsLogin(false);
    setUser(null);
    setToken(null);
  }, []);

  const refreshUser = useCallback(async (): Promise<void> => {
    try {
      const { data } = await appAxios.get(routes.users);
      setUser(data.user);
    } catch (e) {
      await signOut();
      toast('Veuillez vous reconnecter', 'warning');
    }
  }, [user]);

  useEffect(() => {
    if (process.browser && isLogin) {
      const interval = window.setTimeout(refreshUser, 1000 * 60 * 30);

      return () => clearInterval(interval);
    }
  }, [process.browser, isLogin]);

  return (
    <UserContext.Provider value={{ user, token, isLogin, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
