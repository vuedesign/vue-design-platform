const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  images: {
    domains: ['img.js.design']
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: `http://127.0.0.1:8082/:path*`
        }
      ]
    }
  }
}

module.exports = nextConfig
