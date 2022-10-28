const path = require('path');

const resolve = (dir) => path.resolve(__dirname, dir);

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    experimental: {
        esmExternals: 'loose',
    },
    images: {
        // domains: ['*.(.*)'],
        domains: [
            'js.design',
            'baidu.com',
            'lf3-cdn-tos.bytescm.com',
            'nestjs.com',
            'webpack.js.org',
            'vuejs.org',
            'vitejs.dev',
            'www.baidu.com',
            'element-plus.org',
            'cn.vuejs.org',
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://127.0.0.1:8083/api/:path*', // Matched parameters can be used in the destination
            },
        ];
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // config.module.rules.push({
        //     test: /\.(txt|svg|ttf)$/,
        //     type: 'asset/resource',
        //     generator: {
        //         filename: 'static/[hash][ext][query]',
        //     },
        // });
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': resolve('./'),
        };
        return config;
    },
};
