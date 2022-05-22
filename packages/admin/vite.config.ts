import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import viteESLint from '@ehutch79/vite-eslint';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// import ElementPlus from 'unplugin-element-plus/vite';

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
            // 'http://127.0.0.1:8082',
            '/api': {
                target: 'http://127.0.0.1:8082', //跨域网址
                secure: true, // 如果是https接口，需要配置这个参数
                changeOrigin: true, //自动修改http header里面的host
                // pathRewrite: {
                //     '^/api': '/api', //路径的替换规则
                // },
            },
        },
    },
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: {
            '@': resolve(__dirname, 'src'),
            '~/': `${resolve(__dirname, 'src')}/`,
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "~/assets/styles/element/index.scss" as *;`,
            },
        },
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    // treat all tags with a dash as custom elements
                    isCustomElement: (tag) => tag.includes('iconpark-icon'),
                },
            },
        }),
        viteESLint({
            include: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'],
            exclude: 'src/assets/fontawesome/js/*.js',
        }),
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                'pinia',
                {
                    axios: [
                        // default imports
                        ['default', 'axios'], // import { default as axios } from 'axios',
                    ],
                },
            ],
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass',
                }),
            ],
            dts: 'types/auto-imports.d.ts',
        }),
        Components({
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass',
                }),
            ],
            dts: 'types/components.d.ts',
        }),

        // ElementPlus({
        //     useSource: true,
        // }),
    ],
    // hmr: { overlay: true }
});
