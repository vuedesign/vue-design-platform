import { MessageType, ContentModal, Pages, Assets } from '@/globals/contants';
import { IconType } from '@icon-park/react/es/all';

interface InfoData {
    description: string;
    tags: Array<string>;
}
interface MessageValue {
    thumbUrl: string;
    title: string;
}
interface Message {
    type: string;
    data?: MessageValue;
}

export interface MenuListItem {
    key: string;
    title: string;
    icon: IconType;
}

function getCurrentPageInfo(id: number): Promise<any> {
    return new Promise((resolve) => {
        chrome.tabs.sendMessage<Message, any>(
            id,
            {
                type: MessageType.GET_INFO,
            },
            resolve,
        );
    });
}

const isExtension = (url: string) => {
    return url.indexOf('chrome-extension://') > -1;
};

const menuList: Array<MenuListItem> = [
    {
        key: 'new_tab',
        title: '打开新标签页',
        icon: 'TagOne',
    },
    {
        key: 'recommend',
        title: '推荐到vue.design',
        icon: 'Send',
    },
];

interface Cache {
    thumbUrl: string;
    isExecute: boolean;
}

const cache = {
    thumbUrl: '',
    isExecute: false,
};

export default () => {
    const handleRecommend = async () => {
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });
        const { url = '', windowId, id = 0, title = '', favIconUrl = '' } = tab;
        console.log('tab', tab);
        if (isExtension(url)) {
            window.alert('这是一个chrome 插件，不符合推荐条件！');
            return;
        }
        await chrome.scripting.executeScript({
            target: { tabId: id },
            files: ContentModal.SCRIPT_FILES,
        });
        const thumbUrl = await chrome.tabs.captureVisibleTab(windowId, {
            format: Assets.CAPTURE_THUMB_FORMAT,
        });
        const pageInfo = await getCurrentPageInfo(id);
        const info = {
            ...pageInfo,
            thumbUrl,
            favIconUrl,
            title,
            tabId: id,
        };
        console.log('info===', info);
        chrome.storage.local.set({ info, visible: true }, () => {
            chrome.tabs.create({
                url: Pages.HOME_URL,
            });
        });
    };

    const handleNewTab = async () => {
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });
        if (
            tab &&
            tab.title === '首页 - vue.design' &&
            tab.url &&
            isExtension(tab.url)
        ) {
            window.alert('当前标签页已打开！');
            return;
        }
        chrome.tabs.create({
            url: Pages.HOME_URL,
        });
    };
    return {
        handleRecommend,
        handleNewTab,
        menuList,
    };
};
