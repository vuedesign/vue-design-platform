export type MenuNode = {
    label: string;
    value: string;
    active?: boolean;
    icon?: string;
    children?: MenuNode[];
    isOpen?: boolean;
};

export default <MenuNode[]>[
    {
        label: '内容管理',
        value: 'content',
        icon: 'folder-open',
        isOpen: true,
        children: [
            {
                label: '站点管理',
                value: 'site',
                icon: 'browser-chrome',
            },
            {
                label: '首页导航管理',
                value: 'navigation',
                icon: 'navigation',
            },
            {
                label: '素材管理',
                value: 'material',
                icon: 'picture-one',
            },
        ],
    },
    {
        label: '用户管理',
        value: 'user',
        active: true,
        icon: 'user',
    },
    {
        label: '数据分析',
        value: 'data',
        icon: 'folder-open',
        isOpen: true,
        children: [
            {
                label: '埋点管理',
                value: 'buried',
                icon: 'broadcast',
            },
        ],
    },
    {
        label: '配置管理',
        value: 'config',
        icon: 'folder-open',
        isOpen: true,
        children: [],
    },
];
