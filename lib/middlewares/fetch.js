import fetch from 'isomorphic-fetch';
import { LOADING, LOADED } from '../actions';

export default () => next => action => fetchMiddleware(next, action);

export function fetchMiddleware(next, action) {
    if (!action.request) {
        return next(action);
    }
    next({
        ...action,
        type: `${action.type}_PENDING`
    });

    next({
        ...action,
        type: LOADING
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
        error.code = response.status;
        throw error;
    })
    .then(json => {
        return next({
            ...action,
            response: json,
            type: `${action.type}_SUCCESS`
        });
    })
    .catch(error => {
        console.log(error.stack);
        if (error.stack.match('Failed to fetch')) {
            error.code = 'failedFetch';
        }
        return next({
            ...action,
            error,
            type: `${action.type}_ERROR`
        });
    })
    .then(() => next({
        ...action,
        type: LOADED
    }));
}
