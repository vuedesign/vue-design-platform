import { defineConfig, DefaultTheme } from 'vitepress';

export default defineConfig({
    title: 'VueDesign',
    description:
        '一个由当今世界最流行javascript框架（nest、next、vue3）构建的完整链路开源项目',
    themeConfig: {
        siteTitle: '文档',
        logo: '/logo.svg',
        nav: [
            { text: '指导', link: '/guide/' },
            {
                text: '架构',
                items: [
                    { text: '前台前端（nextjs）', link: '/item-1' },
                    { text: '前台后端（nestjs）', link: '/item-2' },
                    { text: '前台插件（chrome）', link: '/item-3' },
                    { text: '后台前端（vue3）', link: '/item-3' },
                    { text: '后台后端（nestjs）', link: '/item-3' },
                ],
            },
            {
                text: '关于',
                items: [
                    { text: '关于我们', link: '/about/' }, // /about/index.md
                    { text: '使用文档', link: '/about/team' }, // /about/three.md
                    { text: '友情链接', link: '/about/link' }, // /about/four.md
                ],
            },
            { text: '变更日志', link: '/change-log' },
        ],
        sidebar: {
            '/guide/': [
                {
                    text: '指导',
                    items: [
                        { text: '介绍', link: '/guide/' },
                        { text: '入门', link: '/guide/getting-started' },
                    ],
                },
            ],
            '/about/': [
                {
                    text: '关于',
                    items: [
                        // This shows `/about/index.md` page.
                        { text: '关于我们', link: '/about/' }, // /about/index.md
                        { text: '使用文档', link: '/about/team' }, // /about/three.md
                        { text: '友情链接', link: '/about/link' }, // /about/four.md
                    ],
                },
            ],
        },
        algolia: {
            appId: '0X4S46JRX9',
            apiKey: '6ae4ce66ee61b418df0f3bfb1725ed21',
            indexName: 'vue design',
            searchParameters: {
                facetFilters: ['tags:en'],
            },
        },
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present n.see',
        },
    },
});
