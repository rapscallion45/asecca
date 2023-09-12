/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /** env variables must be mirrored in .env.test for running Jest */
  env: {
    NEXT_PUBLIC_APP_NAME: `Asecca`,
    NEXT_PUBLIC_APP_DESCRIPTION: `Asecca front end client SPA`,
  },
  output: 'standalone',
};

module.exports = nextConfig;
