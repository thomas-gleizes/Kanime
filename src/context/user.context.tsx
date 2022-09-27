import React, { createContext, useCallback, useState } from 'react';

import { authenticationApi } from 'api';
import { useContextFactory } from 'hooks';
import LocalStorageService from 'services/localStorage.service';

export declare type UserContext = {
  isLogin: boolean;
  user: User;
  signIn: (user: User) => void;
  signOut: () => void;
};

interface Props {
  children: ReactNode;
}

const UserContext = createContext<UserContext>({} as any);

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useUserContext = useContextFactory<UserContext>(UserContext);

const UserContextProvider: Component<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(LocalStorageService.getUser());
  const [isLogin, setIsLogin] = useState<boolean>(!!user);

  const signIn = useCallback((user: User): void => {
    setUser(user);
    setIsLogin(true);

    LocalStorageService.saveUser(user);
  }, []);

  const signOut = useCallback((fetching: boolean = true): void => {
    fetching && authenticationApi.signOut();

    setIsLogin(false);
    setUser(null);

    LocalStorageService.clearUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLogin, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
