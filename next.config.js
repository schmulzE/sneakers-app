/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['pages', 'utils'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
    reactStrictMode: true,
    swcMinify: true,
  }
  
  module.exports = nextConfig
  