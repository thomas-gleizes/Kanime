import React, { createContext, useCallback, useState } from 'react';
import { User } from '@types';
import { useContextFactory } from '@hooks';
import LocalStorage from '@services/localStorage';
import appAxios from '@lib/api/appAxios';

export declare type UserContext = {
  isLogin: boolean;
  user: User;
  logIn: (user: User) => void;
  logOut: () => Promise<void>;
};

interface Props {
  children: React.ReactNode;
}

const UserContext = createContext<UserContext>(null);

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useUserContext = useContextFactory<UserContext>(UserContext);

const UserContextProvider: React.FunctionComponent<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(LocalStorage.fetchUser());
  const [isLogin, setIsLogin] = useState<boolean>(!!user);

  const logIn = useCallback((user: User): void => {
    LocalStorage.saveUser(user);
    setUser(user);
    setIsLogin(true);
  }, []);

  const logOut = useCallback(async (): Promise<void> => {
    await appAxios.get('auth/logout');
    LocalStorage.removeUser();
    setIsLogin(false);
    setUser(null);
  }, []);

  return (
    <UserContext.Provider value={{ user, isLogin, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
