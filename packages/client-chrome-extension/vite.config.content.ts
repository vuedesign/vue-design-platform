import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '~/': `${resolve(__dirname, 'src')}/`,
        },
    },
    plugins: [
        // viteESLint({
        //     include: ['src/**/*.d.ts', 'src/**/*.ts'],
        //     exclude: 'node_modules',
        // }),
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
