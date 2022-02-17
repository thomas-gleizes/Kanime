export const defaultUsersMedia = {
  background: '/media/default/users/background.png',
  avatar: '/media/default/users/avatar.png',
};

export const publicPath = `${process.cwd()}/public`;

export const routes = {
  home: '/',
  animes: {
    list: '/animes',
    anime: (slug: string) => `/animes/${slug}`,
    categories: (slug: string) => `/animes/${slug}/categories`,
    discussions: (slug: string) => `/animes/${slug}/discussions`,
    saga: (slug: string) => `/animes/${slug}/saga`,
    episodes: (slug: string) => `/animes/${slug}/episodes`,
    characters: (slug: string) => `/animes/${slug}/characters`,
    api: {
      list: 'api/animes',
      search: 'api/animes/search',
      slug: (slug: string) => `api/animes/slug${slug}`,
      anime: (id: number) => `/api/animes/${id}`,
      categories: (id: number) => `/api/animes/${id}/categories`,
      entries: (id: number) => `/api/animes/${id}/entries`,
      users: (id: number) => `/api/animes/${id}/users`,
    },
  },
  authentication: {
    signIn: '/authentication/sign-in',
    register: '/authentication/register',
    forgotPassword: '/authentication/forgot-password',
    resetPassword: '/authentication/reset-password/:token',
    api: {
      signIn: '/api/authentication/sign-in',
      register: '/api/authentication/register',
      logout: '/api/authentication/logout',
      forgotPassword: '/api/authentication/forgot-password',
      resetPassword: '/api/authentication/reset-password',
    },
  },
  users: {
    page: (username: string) => `/users/${username}`,
    settings: (username: string) => `/users/${username}/settings`,
    api: {
      current: 'api/users',
    },
  },
  categories: {
    index: '/categories',
    slug: (slug: string) => `/categories/${slug}`,
  },
  common: {
    countries: {
      list: 'api/common/countries',
    },
  },
  logs: {
    api: {
      list: 'api/logs',
    },
  },
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
  400: '400',
  500: '500',
  600: '600',
  700: '700',
  800: '800',
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
