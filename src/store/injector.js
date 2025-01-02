let store

export const injectStore = (storeInstance) => {
    store = storeInstance
}
export const getStore = () => {
    return store
}