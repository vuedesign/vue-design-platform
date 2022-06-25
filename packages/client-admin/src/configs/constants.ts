export const SUCCESS_STATUS_CODE = 0;

export const BRAND_TITLE = 'VueDesign';

export const PAGINATION_LAYOUT = 'total, sizes, prev, pager, next, jumper';

// 状态
export enum STATUS {
    ALL = '',
    AVAILABLE = 1,
    DISABLE = 2,
}

export const statusMap = new Map([
    [STATUS.ALL, '全部状态'],
    [STATUS.AVAILABLE, '可用'],
    [STATUS.DISABLE, '禁用'],
]);
