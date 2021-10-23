// next.config.js
module.exports = {
  images: {
    domains: ["media.kitsu.io"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/explore/animes",
        permanent: true,
      },
    ];
  },
};
