// 角色
export enum RULE {
    ALL = 0,
    SUPPER_ADMIN = 1,
    ADMIN = 2,
    USER = 3,
}

export const ruleMap = new Map([
    [RULE.ALL, '全部'],
    [RULE.SUPPER_ADMIN, '超级管理员'],
    [RULE.ADMIN, '管理员'],
    [RULE.USER, '普通用户'],
]);

// 状态
export enum STATUS {
    ALL = 0,
    AVAILABLE = 1,
    DISABLE = 2,
}

export const statusMap = new Map([
    [STATUS.ALL, '全部'],
    [STATUS.AVAILABLE, '可用'],
    [STATUS.DISABLE, '禁用'],
]);
