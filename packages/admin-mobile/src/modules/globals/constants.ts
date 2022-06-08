import { readonly } from 'vue';

// 首页菜单配置
export const MENU_LIST: Readonly<
    {
        value: string;
        label: string;
    }[]
> = readonly([
    {
        value: 'project',
        label: '项目',
    },
    {
        value: 'team',
        label: '团队',
    },
    {
        value: 'standard',
        label: '规范',
    },
]);

// 角色：1-超级管理员，2-管理员，3-普通用户
export const RULE: Readonly<Record<string, string>> = readonly({
    1: '超级管理员',
    2: '管理员',
    3: '普通用户',
});
