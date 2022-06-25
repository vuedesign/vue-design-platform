import { reactive } from 'vue';
import { findSiteData, createSiteData } from '../../globals/apis';

export type SiteType = 'site' | 'code';
export interface SiteItem {
    authorId?: number;
    title: string;
    description: string;
    type: string;
    thumbUrl: string;
    iconUrl?: string;
    codeUrl?: string;
    siteUrl?: string;
    logoUrl?: string;
    top: number;
    down: number;
    collections: number;
    views: number;
    isShow: number;
    tagIds?: string;
    star?: number;
}

export interface Pagination {
    page: number;
    size: number;
}
export interface ListResult {
    list: Array<SiteItem>;
    pagination: Pagination;
    total: number;
}

export interface Site {
    list: Array<SiteItem>;
    pagination: Pagination;
    total: number;
}

export const site: Site = reactive({
    list: [],
    pagination: {
        page: 0,
        size: 0,
    },
    total: 0,
});

const findSite = async () => {
    const res = await findSiteData<any, ListResult>();
    site.list = res.list;
    site.pagination = res.pagination;
    site.total = res.total;
    console.log('res', res);
};

const createSite = async (data: SiteItem) => {
    const res = await createSiteData<SiteItem, any>(data);
    console.log('res', res);
};

export default () => {
    return {
        findSite,
        createSite,
    };
};
