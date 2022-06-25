const ls = window.localStorage;

export function setItem(key, data) {
    const stringData = JSON.stringify(data);
    ls.setItem(key, stringData);
}

export function getItem(key) {
    try {
        const stringData = ls.getItem(key);
        return JSON.parse(stringData);
    } catch (error) {
        return null;
    }
}

export function hasItem(key) {
    return !!ls.getItem(key);
}

export function clearItem() {
    ls.clear();
}

export function removeItem(key) {
    ls.removeItem(key);
}

export default {
    setItem,
    getItem,
    hasItem,
    clearItem,
    removeItem,
};
