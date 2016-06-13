import { combineReducers } from 'redux';

import { RESET } from '../actions';
import login from './login';
import error from './error';
import userInterface from './userInterface';
import article from './article';
import publication from './publication';
import a2z from './a2z';
import url from './url';
import dbUrl from './dbUrl';
import domains from './domains';
import pausedAction from './pausedAction';

const reducer = combineReducers({
    article,
    publication,
    a2z,
    login,
    userInterface,
    error,
    url,
    dbUrl,
    domains,
    pausedAction
});

export default (state, action) => {
    switch(action.type) {
    case RESET:
        return reducer({}, action);
    default:
        return reducer(state, action);
    }
};
