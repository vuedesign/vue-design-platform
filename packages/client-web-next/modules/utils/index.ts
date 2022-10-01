export const isServer = typeof window === 'undefined';

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

export function stringify(data: string): string {
    const JSEncrypt = require('jsencrypt').default;
    if (typeof window !== 'undefined') {
        const encrypt = new JSEncrypt();
        const publicKey = `-----BEGIN PUBLIC KEY-----
        MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC9h2BtInlMMiutMouv2mlXBl3p
        bgMnsem0wudg10QIeF/EsVy/54CzxJczv7KyPbRGFmDyUveoTsKYekcsh7bwOSKE
        /BA8e3xO8o55Ggdx4OE7LRAVyM/oH4tZPWDuMsOelWPZPHLvBggY2YT0MixUaDC/
        tpXyQaLws2SF/keJ8wIDAQAB
        -----END PUBLIC KEY-----`;
        encrypt.setPublicKey(publicKey);
        const encrypted = encrypt.encrypt(data);
        return encrypted;
    }
    return '';
}

export const crypt = {
    stringify,
};
