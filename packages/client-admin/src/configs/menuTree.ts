export type MenuNode = {
    label: string;
    value: string;
    active?: boolean;
    icon?: string | string[];
    children?: MenuNode[];
    isOpen?: boolean;
};

export default <MenuNode[]>[
    {
        label: '内容中心',
        value: 'content',
        icon: ['FolderOpen', 'FolderClose'],
        isOpen: true,
        children: [
            {
                label: '站点管理',
                value: 'site',
                icon: 'BrowserChrome',
            },
            {
                label: '首页导航管理',
                value: 'navigation',
                icon: 'Navigation',
            },
        ],
    },
    {
        label: '基础模块',
        value: 'base',
        icon: ['FolderOpen', 'FolderClose'],
        isOpen: true,
        children: [
            {
                label: '用户管理',
                value: 'user',
                active: true,
                icon: 'User',
            },
            {
                label: '标签管理',
                value: 'tag',
                icon: 'TagOne',
            },
            {
                label: '文件管理',
                value: 'file',
                icon: 'PictureOne',
            },
            {
                label: '配置管理',
                value: 'config',
                icon: 'SettingTwo',
            },
        ],
    },
    {
        label: '数据中心',
        value: 'data',
        icon: ['FolderOpen', 'FolderClose'],
        isOpen: true,
        children: [
            // {
            //     label: '埋点管理',
            //     value: 'buried',
            //     icon: 'Broadcast',
            // },
            {
                label: '用户统计',
                value: 'count',
                icon: 'Analysis',
            },
        ],
    },
];
