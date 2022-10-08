/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    MAP_API_KEY: process.env.MAP_API_KEY,
  },
}



module.exports = nextConfig
