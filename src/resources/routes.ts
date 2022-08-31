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
  authentification: {
    signIn: '/authentification/sign-in',
    register: '/authentification/register',
    forgotPassword: '/authentification/forgot-password',
    resetPassword: '/authentification/reset-password/:token',
    api: {
      signIn: '/api/authentification/sign-in',
      register: '/api/authentification/register',
      logout: '/api/authentification/logout',
      forgotPassword: '/api/authentification/forgot-password',
      resetPassword: '/api/authentification/reset-password',
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
      list: 'logs',
    },
  },
  feedback: '/feedback',
  forum: '/forum',
  admin: '/admin',
};
