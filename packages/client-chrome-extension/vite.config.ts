import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';
import { Buffer } from 'buffer';

// https://vitejs.dev/config/
import { resolve } from 'path';
export default defineConfig({
    plugins: [
        react(),
        // inject({
        //     'window.Buffer': Buffer,
        // }),
    ],
    build: {
        minify: false,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                popup: resolve(__dirname, 'popup.html'),
            },
        },
    },
    server: {
        open: '/',
        proxy: {
            // 'http://127.0.0.1:8082',
            '/api': {
                target: 'http://127.0.0.1:8083', //跨域网址
                secure: true, // 如果是https接口，需要配置这个参数
                changeOrigin: true, //自动修改http header里面的host
                // pathRewrite: {
                //     '^/api': '/api', //路径的替换规则
                // },
            },
        },
    },
    resolve: {
        alias: {
            '@/': `${resolve(__dirname, 'src')}/`,
        },
    },
});
