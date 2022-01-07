export const defaultUsersMedia = {
  background: '/media/default/users/background.png',
  avatar: '/media/default/users/avatar.png',
};

export const publicPath = `${process.cwd()}/public`;

export const routes = {
  home: '/',
  animes: '/animes',
  mangas: '/mangas',
  sagas: '/sagas',
  authentification: '/auth',
  users: '/users',
  feedback: '/feedback',
  forum: '/forum',
  admin: '/admin',
};

export const loggerReplaceKey = {
  password: '********',
  confirmPassword: '********',
  avatar: 'data:Image/*;base64:*****',
  background: 'data:Image/*;base64:*****',
};

export const errorMessage = {
  ACCESS_DENIED: 'Access denied',
  INTERNAL_ERROR: 'Internal error',
  METHOD_NOT_ALLOWED: 'Method not allowed',
  NOT_FOUND: 'resource not found [404-00]',
  USER_NOT_FOUND: 'user not found [404-01]',
  ANIME_NOT_FOUND: 'anime not found [404-02]',
  FOLLOW: 'you already follow this user [400-10]',
  UNFOLLOW: "you can't unfollow this user [400-11]",
  AUTH_LOGIN: 'email/password wrong [400-20]',
  AUTH_REGISTER: '[400-21]',
  ANIME_USER_STATUS: 'status must be a AnimeStatus [400-30]',
};
