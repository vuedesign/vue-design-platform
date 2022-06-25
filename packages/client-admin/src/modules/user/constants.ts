// 角色
export enum RULE {
    ALL = '',
    SUPPER_ADMIN = 1,
    ADMIN = 2,
    USER = 3,
}

export const ruleMap = new Map([
    [RULE.ALL, '全部角色'],
    [RULE.SUPPER_ADMIN, '超级管理员'],
    [RULE.ADMIN, '管理员'],
    [RULE.USER, '普通用户'],
]);
