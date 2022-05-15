import { defineStore } from 'pinia';
import {
    findData,
    findOneData,
    updateFieldData,
    createData,
    updateData,
    destroyData,
} from './api';

export interface ProjectItem {
    id: number | string;
    name: string;
    description: string;
    thumb: string;
    active?: boolean;
}
export type ProjectList = Array<ProjectItem>;
export interface ProjectFilter {
    page: number;
    size: number;
    order: string;
    tagId: number;
}
export interface ProjectState {
    detail: ProjectItem;
    list: ProjectList;
    filter: ProjectFilter;
    total: number;
}

export interface UpdateFieldPamas {
    id: number;
    field: string;
    value: any;
    type: string;
}

export default defineStore('project', {
    state: (): ProjectState => ({
        detail: {
            id: undefined,
            name: '',
            description: '',
            thumb: '',
        },
        list: [],
        filter: {
            page: 1,
            size: 7,
            order: 'updatedAt DESC',
            tagId: 0,
        },
        total: 0,
    }),
    actions: {
        async find(query?: Record<string, any>) {
            Object.assign(this.filter, query);
            const res = await findData(this.filter);
            this.list = res.list.map((item) => {
                return {
                    ...item,
                    active: false,
                };
            });
            this.total = res.total;
        },
        async findOne(id: number) {
            this.detail = await findOneData(id);
        },
        async updateField({ id, field, value, type }: UpdateFieldPamas) {
            const res = await updateFieldData(id, {
                field,
                value,
                type,
            });
            await this.find();
            console.log('res', res);
        },
        create(data = {}) {
            return createData(data).then((res) => {
                this.find();
                return res;
            });
        },
        update(data = {}) {
            return updateData(data).then((res) => {
                this.find();
                return res;
            });
        },
        destroy(id: number) {
            return destroyData(id).then((res) => {
                this.find();
                return res;
            });
        },
        updateActivceState({ id, active }: { id: number; active: boolean }) {
            this.list.forEach((item) => {
                if (item.id === id) {
                    item.active = active;
                } else {
                    item.active = false;
                }
            });
        },
    },
});
