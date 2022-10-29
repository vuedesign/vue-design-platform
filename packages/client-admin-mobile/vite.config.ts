import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import viteESLint from '@ehutch79/vite-eslint';
// import myPlugin from './myPlugin';
import ViteComponents, { VarletUIResolver } from 'vite-plugin-components';

// https://vitejs.dev/config/
export default defineConfig({
    // hmr: { overlay: false },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                mobile: resolve(__dirname, 'mobile.html'),
            },
        },
    },
    server: {
        open: '/',
        proxy: {
            '/api': 'http://127.0.0.1:8082',
            // {
            //     target: 'http://127.0.0.1:8082', //跨域网址
            //     secure: true, // 如果是https接口，需要配置这个参数
            //     changeOrigin: true, //自动修改http header里面的host
            //     pathRewrite: {
            //         '^/api': '/api', //路径的替换规则
            //     }
            // }
        },
    },
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: {
            '@': resolve(__dirname, 'src'),
            '@/': resolve(__dirname, 'src/'),
        },
    },
    plugins: [
        vue(),
        viteESLint({
            include: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'],
            exclude: 'src/assets/fontawesome/js/*.js',
        }),
        ViteComponents({
            customComponentResolvers: [VarletUIResolver()],
        }),
    ],
    // hmr: { overlay: true }
});
