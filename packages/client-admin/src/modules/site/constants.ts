// 角色
export enum TYPE {
    ALL = '',
    CODE = 'code',
    SITE = 'site',
}

export const typeMap = new Map([
    [TYPE.ALL, '全部类型'],
    [TYPE.CODE, '代码'],
    [TYPE.SITE, '站点'],
]);
