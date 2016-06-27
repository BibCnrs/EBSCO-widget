import { combineReducers } from 'redux';

import { RESET } from '../actions';
import login from './login';
import error from './error';
import userInterface from './userInterface';
import url from './url';
import dbUrl from './dbUrl';
import domains from './domains';
import pausedAction from './pausedAction';
import selectedRecord from './selectedRecord';
import notice from './notice';
import articleLink from './articleLink';
import facets from './facets';
import limiters from './limiters';
import searchResult from './searchResult';
import search from './search';
import history from './history';
import queryList from './queryList';

const reducer = combineReducers({
    login,
    userInterface,
    error,
    url,
    dbUrl,
    domains,
    selectedRecord,
    notice,
    articleLink,
    facets,
    limiters,
    searchResult,
    search,
    queryList,
    history,
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
