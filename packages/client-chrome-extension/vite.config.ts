import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
import { resolve } from 'path';
export default defineConfig({
    plugins: [
        react(),
        createStyleImportPlugin({
            resolves: [AntdResolve()],
        }),
    ],
    css: {
        preprocessorOptions: {
            less: {
                // 支持内联 javascript
                javascriptEnabled: true,
            },
        },
    },
    build: {
        minify: false,
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
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
    define: {
        // 'precess.env': {},
    },
});
