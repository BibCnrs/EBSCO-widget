import { combineReducers } from 'redux';

import login from './login';
import error from './error';
import userInterface from './userInterface';
import article from './article';
import publication from './publication';
import url from './url';

export default combineReducers({
    article,
    publication,
    login,
    userInterface,
    error,
    url
});
