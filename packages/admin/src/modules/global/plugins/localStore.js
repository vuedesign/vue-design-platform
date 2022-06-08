const UPDATE_CURRENT_PAGE_STYLE = 'workbench/UPDATE_CURRENT_PAGE_STYLE';
const UPDATE_CURRENT_PAGE_CUSTOM_STATE =
    'workbench/UPDATE_CURRENT_PAGE_CUSTOM_STATE';

function updateItem(ls, { type, payload }) {
    let data = {};
    if (ls.hasItem(type)) {
        data = ls.getItem(type);
    }
    Object.assign(data, payload);
    ls.setItem(type, data);
}

function intLsData(store, ls, key) {
    if (ls.hasItem(key)) {
        const data = ls.getItem(key);
        console.log('data', data);
        store.commit(key, data);
    }
}

export default function createLocalStorePlugin(ls) {
    return (store) => {
        intLsData(store, ls, UPDATE_CURRENT_PAGE_STYLE);
        intLsData(store, ls, UPDATE_CURRENT_PAGE_CUSTOM_STATE);

        store.subscribe((mutation) => {
            // console.log('mutation', mutation);
            switch (mutation.type) {
                case UPDATE_CURRENT_PAGE_STYLE:
                    {
                        updateItem(ls, mutation);
                    }
                    break;
                case UPDATE_CURRENT_PAGE_CUSTOM_STATE:
                    {
                        updateItem(ls, mutation);
                    }
                    break;
            }
        });
    };
}
