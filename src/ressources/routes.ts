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
