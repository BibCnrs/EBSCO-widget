'use strict';

import fetch from 'isomorphic-fetch';

export default store => next => action => fetchMiddleware(next, action);

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
            return response.json();
        }
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    })
    .then(json => {
        console.log(action);
        console.log({
            ...action,
            response: json,
            type: `${action.type}_SUCCESS`
        });
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
