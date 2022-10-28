export interface Configure {
    id: number;
    group?: string;
    key: string;
    value: string;
    link?: string;
    status: number;
    remark?: string;
    content?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
