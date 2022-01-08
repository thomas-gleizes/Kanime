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

export const tailwindcssGradiant = {
  50: '50',
  100: '100',
  200: '200',
  300: '300',
  500: '500',
  600: '600',
  700: '800',
  900: '900',
}

export const tailwindcssColors = {
  Slate: "Slate",
  Gray: "Gray",
  Zinc: "Zinc",
  Neutral: "Neutral",
  Stone: "Stone",
  Red: "Red",
  Orange: "Orange",
  Amber: "Amber",
  Yellow: "Yellow",
  Lime: "Lime",
  Green: "Green",
  Emerald: "Emerald",
  Teal: "Teal",
  Cyan: "Cyan",
  Sky: "Sky",
  Blue: "Blue",
  Indigo: "Indigo",
  Violet: "Violet",
  Purple: "Purple",
  Fuchsia: "Fuchsia",
  Pink: "Pink",
  Rose: "Rose",
}