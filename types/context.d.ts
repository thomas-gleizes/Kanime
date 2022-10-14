interface UserBaseContext {
  signIn: (user: User) => void;
  signOut: () => void;
}

interface UserUnauthenticatedContext extends UserBaseContext {
  isLogin: false;
  user: null;
}

interface UserAuthenticatedContext extends UserBaseContext {
  isLogin: true;
  user: User;
}

declare type UserContext = UserUnauthenticatedContext | UserAuthenticatedContext;
