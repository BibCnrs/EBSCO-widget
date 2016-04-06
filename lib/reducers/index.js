import { combineReducers } from 'redux';

import { RESET } from '../actions';
import login from './login';
import error from './error';
import userInterface from './userInterface';
import article from './article';
import publication from './publication';
import url from './url';

const reducer = combineReducers({
    article,
    publication,
    login,
    userInterface,
    error,
    url
});

export default (state, action) => {
    switch(action.type) {
    case RESET:
        return reducer({}, action);
    default:
        return reducer(state, action);
    }
};
