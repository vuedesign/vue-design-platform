import { reactive, computed, ComputedRef } from 'vue';
import { message } from 'ant-design-vue';

interface UserData {
    avatar: string;
    username: string;
}
type SiteType = 'site' | 'code';
export interface Info {
    tabId?: number;
    thumb: string;
    title: string;
    description: string;
    tags: string[];
    type: SiteType;
    imgs: string[];
    logo: string;
    siteUrl: string;
    codeUrl: string;
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
    state.info.logo = img;
};

const handleRecommend = (): void => {
    if (!state.token || !state.user) {
        message.warning('您未登录，请点击右上角「登录/注册」按钮！');
        return;
    }
    if (!state.info.logo && state.info.imgs.some((img) => !!img)) {
        message.warning('请点击选择下面图片作为网站icon！');
        return;
    }
    state.loading = true;
    setTimeout(() => {
        state.loading = false;
        state.visible = false;
    }, 1500);
};

const handleCancel = (): void => {
    state.visible = false;
};

export default () => {
    return {
        handleRecommend,
        handleCancel,
        handleSelectLogo,
    };
};
