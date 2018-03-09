import { combineReducers } from 'redux';

import { RESET } from '../actions';
import login from './login';
import error from './error';
import userInterface from './userInterface';
import url from './url';
import domains from './domains';
import pausedAction from './pausedAction';
import selectedRecord from './selectedRecord';
import notice from './notice';
import facets from './facets';
import limiters from './limiters';
import searchResult from './searchResult';
import search from './search';
import history from './history';
import queryList from './queryList';
import exactMatch from './exactMatch';
import profile from './profile';
import databases from './databases';
import favouriteResources from './favouriteResources';

const reducer = combineReducers({
    login,
    userInterface,
    error,
    url,
    domains,
    selectedRecord,
    notice,
    facets,
    limiters,
    searchResult,
    search,
    queryList,
    history,
    pausedAction,
    exactMatch,
    profile,
    databases,
    favouriteResources,
});

export default (state, action) => {
    switch (action.type) {
        case RESET:
            return reducer(
                {
                    url: state.url,
                    domains: domains(state.domains, action),
                },
                action,
            );
        default:
            return reducer(state, action);
    }
};
