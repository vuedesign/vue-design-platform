export function localGet(key: string, cb: (data: Record<string, any>) => void) {
    try {
        chrome.storage.local.get(key, (data: Record<string, any>) => {
            cb && cb(data);
        });
    } catch (error) {}
}
