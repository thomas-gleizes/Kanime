import React, { createContext, useState } from "react";

import { useContextFactory } from "../helpers/hooks";
import { ContextProps } from "../helpers/interfaces/global";
import User from "../helpers/interfaces/user";
import authServices from "../helpers/authServices";

interface UserContext {
  isLogin: boolean;
  user: User;
}

interface UserContextAction {
  logUser: ({ user: User, token: string }) => void;
  logOut: () => void;
  updateUser: (user: User) => void;
}

const UserContext = createContext<UserContext>(null);
const UserContextAction = createContext<UserContextAction>(null);

export const useUserContext = useContextFactory(UserContext);
export const useUserContextAction = useContextFactory(UserContextAction);

const UserContextProvider: React.FC<ContextProps> = ({ children }) => {
  const [user, setUser] = useState<User>(authServices.getUser());

  const logUser = ({ user, token }: { user: User; token: string }): void => {
    authServices.setToken(token);
    authServices.setUser(user);

    setUser(user);
  };

  const updateUser = (user: User): void => {
    authServices.setUser(user);

    setUser(user);
  };

  const logOut = (): void => {
    authServices.logout();

    setUser(null);
  };

  return (
    <UserContext.Provider value={{ isLogin: !!user, user }}>
      <UserContextAction.Provider value={{ logUser, logOut, updateUser }}>
        {children}
      </UserContextAction.Provider>
    </UserContext.Provider>
  );
};

export default UserContextProvider;
