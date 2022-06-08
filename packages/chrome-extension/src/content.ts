import { MessageType } from './globals/contants';

const CODE_SITES = ['github.com'];

function getAttributeContent(
    doc: Document,
    attribute: string,
    content: string,
): string {
    const attr = doc.querySelector(attribute) || '';
    if (attr && attr.getAttribute) {
        return attr.getAttribute(content) || '';
    }
    return '';
}

function getSiteTags(keywords?: string | undefined): Array<string> {
    return keywords ? keywords.split(',') : [];
}

function getSiteUrl(): string {
    return window.location.origin || '';
}

// github
function isCode() {
    const siteUrl = getSiteUrl();
    return CODE_SITES.some((item) => siteUrl.indexOf(item) > -1);
}

function getImages(doc: Document): Array<string> {
    if (!doc.querySelectorAll('img')) {
        return [];
    }
    const imgDoms = doc.querySelectorAll('img');
    const imgs: Array<string> = [];
    imgDoms.forEach((item) => {
        if (
            item.currentSrc &&
            item.currentSrc.indexOf(';base64,') <= -1 &&
            !imgs.includes(item.currentSrc)
        ) {
            item.currentSrc && imgs.push(item.currentSrc);
        }
    });

    if (imgs.length >= 5) {
        return imgs;
    } else {
        new Array(5 - imgs.length).forEach(() => {
            imgs.push('');
        });
        return imgs;
    }
}

function getSiteInfo(doc: Document) {
    const description = getAttributeContent(
        doc,
        '[name="description"]',
        'content',
    );
    const keywords = getAttributeContent(doc, '[name="keywords"]', 'content');
    const tags = getSiteTags(keywords);
    const siteUrl = getSiteUrl();
    return {
        type: 'site',
        description,
        tags,
        siteUrl,
    };
}

function getCodeTags(doc: Document) {
    return Array.from(
        doc.querySelectorAll('.BorderGrid-cell > div > div > a'),
    ).map((item: HTMLElement) => item.innerText);
}

function getCodeUrl(doc: Document): string {
    const a = doc.querySelector(
        '.BorderGrid-cell > div > span > a',
    ) as HTMLLinkElement;
    if (!a) {
        return '';
    }
    return a.href;
}

function getCodeStar(doc: Document): string {
    const star = doc.getElementById('repo-stars-counter-star');
    if (!star) {
        return '';
    }
    return star.innerText;
}

function getCodeInfo(doc: Document) {
    const tags = getCodeTags(doc);
    const codeUrl = getCodeUrl(doc);
    const star = getCodeStar(doc);
    const description = getAttributeContent(
        doc,
        '[name="description"]',
        'content',
    );
    return {
        type: 'code',
        description,
        tags,
        codeUrl,
        star,
    };
}

interface Info {
    type: string;
    description: string;
    tags: string[];
    siteUrl?: string;
    codeUrl?: string;
    star?: string;
}

const handlerMessage = (
    request: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void,
) => {
    if (request.type === MessageType.GET_INFO) {
        const doc = document;
        const imgs = getImages(doc);
        const detail = {
            imgs,
        };
        let info: Info = getSiteInfo(doc);
        if (isCode()) {
            info = getCodeInfo(doc);
        }
        Object.assign(detail, info);
        sendResponse(detail);
    }
};

chrome.runtime.onMessage.addListener(handlerMessage);
