// let color = '#3aa757';
let color = 'red';
chrome.runtime.onInstalled.addListener(async () => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
});
