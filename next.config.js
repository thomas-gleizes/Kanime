/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['media.kitsu.io'],
  },
  pageExtensions: ['page.tsx', 'api.ts'],
  reactStrictMode: true,
  headers: () => [
    {
      source: '/api/:path*',
      headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
    },
  ],
};
