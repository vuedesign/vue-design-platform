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
