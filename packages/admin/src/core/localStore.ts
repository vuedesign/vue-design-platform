const ls = window.localStorage;

export function setItem(key: string, data: any) {
    const stringData = JSON.stringify(data);
    ls.setItem(key, stringData);
}

export function getItem(key: string): any {
    try {
        const stringData = ls.getItem(key) || '';
        return JSON.parse(stringData);
    } catch (error) {
        return null;
    }
}

export function hasItem(key: string): boolean {
    return !!ls.getItem(key);
}

export function clearItem() {
    ls.clear();
}

export function removeItem(key: string) {
    ls.removeItem(key);
}
