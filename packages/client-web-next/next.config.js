const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["**"],
    // domains: [
    //   "img.js.design",
    //   "t7.baidu.com",
    //   "lf3-cdn-tos.bytescm.com",
    //   "nestjs.com",
    //   "webpack.js.org",
    //   "www.baidu.com",
    // ],
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: `http://127.0.0.1:8083/:path*`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
