const AUTH_TOKEN = "auth_token";
const AUTH_USER = "auth_user";
const AUTH_MEDIA = "auth_media";
const AUTH_TIME = "auth_time";
const AUTH_ADMIN = "auth_admin";

const authServices = {
  isLoginIn: () => {
    if (process.browser) {
      return !!localStorage.getItem(AUTH_USER);
    }
    return null;
  },

  getUser: () => {
    if (process.browser) {
      return JSON.parse(localStorage.getItem(AUTH_USER));
    }
    return null;
  },

  getToken: () => {
    if (process.browser) {
      return localStorage.getItem(AUTH_TOKEN);
    }
    return null;
  },

  getAdmin: () => {
    if (process.browser) {
      return !!localStorage.getItem(AUTH_ADMIN);
    }
  },

  getAvatar: () => {
    if (process.browser) {
      return JSON.parse(localStorage.getItem(AUTH_MEDIA));
    }
    return null;
  },

  setUser: (user) => {
    if (process.browser) {
      localStorage.setItem(AUTH_USER, JSON.stringify(user));
      localStorage.setItem(AUTH_TIME, Date.now().toString());
    }
  },

  setToken: (token) => {
    if (process.browser) {
      localStorage.setItem(AUTH_TOKEN, token);
    }
  },

  setAdmin: (value) => {
    if (process.browser) {
      localStorage.setItem(AUTH_ADMIN, value);
    }
  },

  setAvatar: (avatar) => {
    if (process.browser) {
      localStorage.setItem(AUTH_MEDIA, JSON.stringify(avatar));
    }
  },

  checkTime: () => {
    if (process.browser) {
      const now = Date.now();
      const authTime = parseInt(localStorage.getItem(AUTH_TIME));
      return !(authTime + 1000 * 60 * 60 * 4 > now);
    }
    return true;
  },

  resetTime: () => {
    if (process.browser) {
      localStorage.setItem(AUTH_TIME, Date.now().toString());
    }
  },

  logout: () => {
    if (process.browser) {
      localStorage.clear();
    }
  },
};

export default authServices;
