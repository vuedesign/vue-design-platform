export default function createIndexDbPlugin(db) {
    return (store) => {
        console.log('db', db);
        // store.commit('receiveData', data)
        store.subscribe((mutation) => {
            if (mutation.type === 'UPDATE_DATA') {
                // socket.emit('update', mutation.payload)
            }
        });
    };
}
