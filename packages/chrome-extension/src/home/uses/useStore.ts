import { reactive, computed, ComputedRef } from 'vue';
import router from '../../globals/router';
import { message } from 'ant-design-vue';
import useSite, { SiteItem } from './useSite';
import { uploadFileData } from '../../globals/apis';
import { base64toFile } from '../../globals/utils';

export interface UserData {
    avatar: string;
    username: string;
}
export type SiteType = 'site' | 'code';
export interface Info {
    tabId?: number;
    title: string;
    description: string;
    tags: string[];
    type: SiteType;
    imgs: string[];
    thumbUrl: string;
    logoUrl: string;
    siteUrl: string;
    codeUrl: string;
    favIconUrl: string;
    star: string;
}

export interface State {
    view: string;
    token: string;
    visible: boolean;
    loading: boolean;
    info: Info;
    user: UserData | null;
}

export const state: State = reactive({
    view: 'modal-content',
    token: '',
    visible: true,
    loading: false,
    info: {} as Info,
    user: null,
});

export const imgWrapWidth: ComputedRef<number> = computed(() => {
    return state.info.imgs.length * 100 + (state.info.imgs.length - 1) * 7;
});

const handleSelectLogo = (img: string): void => {
    state.info.logoUrl = img;
};

function uploadFile(base64: string): Promise<any> {
    const file = base64toFile(base64);
    const formData: FormData = new FormData();
    formData.append('file', file);
    return uploadFileData<FormData, any>(formData);
}

const handleRecommend = async (): Promise<void> => {
    if (!state.token || !state.user) {
        message.warning('您未登录，请点击右上角「登录/注册」按钮！');
        return;
    }
    if (!state.info.logoUrl && state.info.imgs.some((img) => !!img)) {
        message.warning('请点击选择下面图片作为网站icon！');
        return;
    }

    const { createSite, findSite } = useSite();
    state.loading = true;

    const fileRes = await uploadFile(state.info.thumbUrl);

    console.log('fileRes', fileRes);

    const item: SiteItem = {
        codeUrl: state.info.codeUrl,
        collections: 0,
        description: state.info.description,
        down: 0,
        iconUrl: state.info.favIconUrl,
        isShow: 1,
        logoUrl: state.info.logoUrl,
        siteUrl: state.info.siteUrl,
        tagIds: '1,2,3',
        thumbUrl: fileRes.path,
        title: state.info.title,
        top: 0,
        type: state.info.type,
        views: 0,
    };

    createSite(item)
        .then(() => {
            router.push({
                path: '/',
            });
            findSite();
        })
        .finally(() => {
            state.loading = false;
        });
};

const handleCancel = (): void => {
    console.log('router', router);
    router.push({
        path: '/',
    });
};

export default () => {
    return {
        handleRecommend,
        handleCancel,
        handleSelectLogo,
    };
};
