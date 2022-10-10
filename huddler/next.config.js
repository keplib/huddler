/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    customKey: process.env.GOOGLE_API_KEY,
    },
}

module.exports = nextConfig
