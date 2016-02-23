import { combineReducers } from 'redux';

import login from './login';
import error from './error';
import userInterface from './userInterface';
import article from './article';

export default function reducers(url, term, domain) {
    return combineReducers({
        article: article(term, domain),
        login,
        userInterface,
        error,
        url: () => url
    });
}
