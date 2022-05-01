import { defineConfig, build } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import viteESLint from '@ehutch79/vite-eslint';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '~/': `${resolve(__dirname, 'src')}/`,
        },
    },
    plugins: [
        vue(),
        viteESLint({
            include: ['src/**/*.vue', 'src/**/*.d.ts', 'src/**/*.ts'],
            exclude: 'node_modules',
        }),
        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: 'sass',
                }),
            ],
        }),
        ,
    ],
    build: {
        minify: false,
        emptyOutDir: false,
        lib: {
            entry: resolve(__dirname, 'src/content.ts'),
            name: 'VueDesignContent',
            fileName: (format) => `vue-design-content.${format}.js`,
        },
    },
});
