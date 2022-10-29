import { Buffer } from 'buffer';

export function getUuid(uuid?: string | string[]) {
    console.log('uuid', uuid);
    if (!uuid || uuid === 'string') {
        return '';
    }
    if (Array.isArray(uuid)) {
        return uuid[0];
    }
    return uuid;
}

export function getParamsByContext<C extends Record<string, any>>(
    context: C,
    filed: string,
): string {
    let params = new URLSearchParams(context.params);
    if (!filed || !params.has(filed)) {
        return '';
    }
    if (params.has(filed) && params.get(filed) === 'string') {
        const referrer =
            context.req.headers.referrer || context.req.headers.referer;
        const uuid = referrer.match(
            /([0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12})/gi,
        );
        if (!uuid) {
            return '';
        }
        return uuid[0];
    }
    return params.get(filed) || '';
}

export type BufferJSON = {
    type: 'Buffer';
    data: number[];
};

export function encrypt(data: string, publicKeyJSON?: BufferJSON): string {
    const JSEncrypt = require('jsencrypt').default;
    const publicKey = Buffer.from(publicKeyJSON?.data || []).toString();
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    const encrypted = encrypt.encrypt(data);
    return encrypted || '';
}

export function diffObject(
    cacheData: Record<string, any>,
    data: Record<string, any>,
) {
    return Object.keys(data).every((key) => data[key] === cacheData[key]);
}

export function base64toFile(base64Data: string): Blob | null {
    //去掉base64的头部信息，并转换为byte
    let str = base64Data.split(',');
    let bytes = window.atob(str[1]);
    if (!str || !str[0]) {
        return null;
    }
    const m = str[0].match(/:(.*?);/);
    if (!m || !m[1]) {
        return null;
    }
    //获取文件类型
    let fileType = m[1];
    //处理异常,将ascii码小于0的转换为大于0
    let ab = new ArrayBuffer(bytes.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: fileType });
}
