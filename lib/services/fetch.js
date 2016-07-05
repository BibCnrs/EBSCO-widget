import fetch from 'isomorphic-fetch';

export default ({url, config}) => {
    return fetch(url, config)
    .then((response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.text()
            .then((text) => text)
            .then((text) => JSON.parse(text));
        }
        var error = new Error(response.statusText);
        error.response = response;
        error.code = response.status;
        throw error;
    });
};
