import { combineReducers } from 'redux';

import login from './login';
import error from './error';
import userInterface from './userInterface';
import article from './article';
// import publication from './publication';

export default function reducers(url, term, domain) {
    return combineReducers({
        article: article(term, domain),
        // publication,
        login,
        userInterface,
        error,
        url: () => url
    });
}
