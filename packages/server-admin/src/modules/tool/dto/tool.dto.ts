export type LikeParamType = 'top' | 'down' | 'collections';

export interface FindOneQuery {
    authorId: number;
    siteId: number;
}

export interface LikeParam extends FindOneQuery {
    type: LikeParamType;
    value: number;
}
