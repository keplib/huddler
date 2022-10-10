/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["thumbs.dreamstime.com"],
  },
  env: {
    customKey: process.env.GOOGLE_API_KEY,
    },
}

module.exports = nextConfig
