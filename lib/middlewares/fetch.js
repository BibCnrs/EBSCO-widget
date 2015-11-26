'use strict';

import fetch from 'isomorphic-fetch';

export default () => next => action => fetchMiddleware(next, action);

export function fetchMiddleware(next, action) {
    if (!action.request) {
        return next(action);
    }
    next({
        ...action,
        type: `${action.type}_PENDING`
    });

    const { request } = action;

    fetch(request.url, request.config)
    .then((response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.text()
            .then((text) => text)
            .then((text) => JSON.parse(text));
        }
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    })
    .then(json => {
        return next({
            ...action,
            response: json,
            type: `${action.type}_SUCCESS`
        });
    })
    .catch(error => next({
        ...action,
        error,
        type: `${action.type}_ERROR`
    }));
}
