import { reactive, Ref, ref } from 'vue';
import { MessageType, ContentModal, Pages, Assets } from '../globals/contants';

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

interface MenuListItem {
    key: string;
    title: string;
    icon: string;
}

function captureThumb(windowId: number): Promise<string> {
    return new Promise((resolve) => {
        chrome.tabs.captureVisibleTab(
            windowId,
            { format: Assets.CAPTURE_THUMB_FORMAT },
            resolve,
        );
    });
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

function executeScript(tabId: number): Promise<any> {
    return new Promise((resolve) => {
        chrome.scripting.executeScript(
            {
                target: { tabId },
                files: ContentModal.SCRIPT_FILES,
            },
            resolve,
        );
    });
}

const isExtension = (url: string) => {
    return url.indexOf('chrome-extension://') > -1;
};

const menuList: Array<MenuListItem> = reactive([
    {
        key: 'new_tab',
        title: '打开新标签页',
        icon: 'tag-one',
    },
    {
        key: 'recommend',
        title: '推荐到vue.design',
        icon: 'send',
    },
]);

interface Cache {
    thumbUrl: string;
    isExecute: boolean;
}

const cache = reactive({
    thumbUrl: '',
    isExecute: false,
});

export default () => {
    const handleRecommend = async () => {
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });
        const { url, windowId, id, title = '', favIconUrl = '' } = tab;
        console.log('tab', tab);
        if (isExtension(url)) {
            window.alert('这是一个chrome 插件，不符合推荐条件！');
            return;
        }
        await executeScript(id);
        const thumbUrl = await captureThumb(windowId);
        const pageInfo = await getCurrentPageInfo(id);
        const info = {
            thumbUrl,
            ...pageInfo,
            favIconUrl,
            title,
            tabId: id,
        };
        chrome.storage.local.set({ info }, () => {
            chrome.tabs.create({
                url: Pages.HOME_URL + '#/modal-push',
            });
        });
    };

    const handleNewTab = () => {
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
