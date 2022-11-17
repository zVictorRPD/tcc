const withPWA = require('next-pwa')({
  dest: 'public'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    MAP_API_KEY: process.env.MAP_API_KEY,
  },
}



module.exports = withPWA(nextConfig)
