/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
