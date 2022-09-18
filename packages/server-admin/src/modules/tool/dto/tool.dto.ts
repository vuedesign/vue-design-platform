export type LikeParamType = 'top' | 'down';
export interface LikeParam {
    type: LikeParamType;
    authorId: number;
    siteId: number;
}
