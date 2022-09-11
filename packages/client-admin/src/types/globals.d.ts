export interface UpdateFieldParmas {
    id: number;
    field: string;
    value: any;
    type: string;
}

export interface ListFilter {
    page?: number;
    size?: number;
    status?: number | string;
}

export interface BaseItem {
    id?: number;
    uuid?: string;
    status?: number | string;
    createdAt?: string;
    updatedAt?: string;
}
