export const defaultUsersMedia = {
  background: '/media/default/users/background.png',
  avatar: '/media/default/users/avatar.png',
};

export const publicPath = `${process.cwd()}/public`;

export const routes = {
  home: '/',
  animes: '/animes',
  categories: '/categories',
  mangas: '/mangas',
  sagas: '/sagas',
  authentication: '/authentication',
  users: '/users',
  feedback: '/feedback',
  forum: '/forum',
  admin: '/admin',
};

export const dialogTypes = {
  confirm: 'confirm',
  alert: 'alert',
  prompt: 'prompt',
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

export const tailwindcssGradiant = {
  50: '50',
  100: '100',
  200: '200',
  300: '300',
  500: '500',
  600: '600',
  700: '800',
  900: '900',
};

export const tailwindcssColors = {
  slate: 'slate',
  gray: 'gray',
  zinc: 'zinc',
  neutral: 'neutral',
  stone: 'stone',
  red: 'red',
  orange: 'orange',
  amber: 'amber',
  yellow: 'yellow',
  lime: 'lime',
  green: 'green',
  emerald: 'emerald',
  teal: 'teal',
  cyan: 'cyan',
  sky: 'sky',
  blue: 'blue',
  indigo: 'indigo',
  violet: 'violet',
  purple: 'purple',
  fuchsia: 'fuchsia',
  pink: 'pink',
  rose: 'rose',
};
