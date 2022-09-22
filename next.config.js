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
    {
      source: '/fonts/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
