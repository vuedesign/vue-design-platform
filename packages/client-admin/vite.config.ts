import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import viteESLint from '@ehutch79/vite-eslint';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { ElementPlusResolver } from '@vue-design/resolver-2n';

// https://vitejs.dev/config/
export default defineConfig({
    // hmr: { overlay: false },
    build: {},
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
        dedupe: ['vue'],
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: {
            '@': resolve(__dirname, 'src'),
            '~/': `${resolve(__dirname, 'src')}/`,
        },
    },
    css: {
        modules: {
            localsConvention: 'camelCaseOnly',
        },
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
                    isCustomElement: (tag) => tag.includes('add-config'),
                },
            },
        }),
        viteESLint({
            include: ['src/**/*.vue', 'src/**/*.ts'],
        }),
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                'pinia',
                {
                    axios: [['default', 'axios']],
                },
            ],
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass',
                }),
            ],
            dts: 'src/types/auto-imports.d.ts',
            eslintrc: {
                enabled: false, // Default `false`
                filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
            },
        }),
        Components({
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass',
                }),
            ],
            dts: 'src/types/components.d.ts',
        }),
    ],
});
