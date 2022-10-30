import { MessageType } from './globals/contants';

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
        let info: Info = getSiteInfo(document);
        sendResponse(info);
    }
};

chrome.runtime.onMessage.addListener(handlerMessage);
