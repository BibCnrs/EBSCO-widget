const createStorage = rawStorage => {
    return {
        getItem: key => JSON.parse(rawStorage.getItem(key)),

        setItem: (key, value) => rawStorage.setItem(key, JSON.stringify(value)),

        removeItem: key => rawStorage.removeItem(key),
    };
};

export const sessionStorage = createStorage(window.sessionStorage);
export const localStorage = createStorage(window.localStorage);
