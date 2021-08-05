export const forum = {
  index: "/",
};

export const feedback = {
  index: "/",
};

export const admin = {
  index: "/admin",
};

export const users = {
  index: "/users",
};

export const animes = {
  index: "/anime",
};

export const saga = {
  index: "/saga",
};

export const explore = {
  animes: {
    index: "/explore/animes",
    popular: "/explore/animes/popular",
    rated: "/explore/animes/rated",
    currentSeason: "/explore/animes/current-season",
  },
  mangas: {
    index: "/explore/mangas",
    popular: "/explore/mangas/popular",
    rated: "/explore/mangas/rated",
  },
  sagas: {
    index: "/explore/sagas",
  },
};

export const img = {
  default: {
    avatar: `${process.env.NEXT_PUBLIC_API}/media/user/default/avatar.JPG`,
    background: `${process.env.NEXT_PUBLIC_API}/media/user/default/background.png`,
  },
};
