import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import _ from 'lodash';

import { RESET } from '../actions';
import login, * as fromLogin from './login';
import error from './error';
import userInterface, * as fromUserInterface from './userInterface';
import url from './url';
import dbUrl from './dbUrl';
import domains, * as fromDomains from './domains';
import pausedAction from './pausedAction';
import selectedRecord, * as fromSelectedRecord from './selectedRecord';
import notice, * as fromNotice from './notice';
import articleLink, * as fromArticleLink from './articleLink';
import facets, * as fromFacets from './facets';
import limiters, * as fromLimiters from './limiters';
import searchResult, * as fromSearchResultSelectors from './searchResult';
import search, * as fromSearch from './search';
import history from './history';
import queryList, * as fromQueryList  from './queryList';

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

const batchCreateSelector = (reducerSelector, fromSelectors) => {
    return Object.keys(fromSelectors)
    .filter(selectorName => _.isFunction(fromSelectors[selectorName]))
    .reduce((extendedSelectors, selectorName) => ({
        ...extendedSelectors,
        [selectorName]: createSelector(reducerSelector, fromSelectors[selectorName])
    }), {});

};

export const getUserInterface = (state) => state.userInterface;
export const {
    getLocation,
    getLanguage,
    isLoginShown,
    isFullScreen,
    isLimiterShown,
    isResultShown,
    isHistoryShown,
    isLoading,
    hasLimiterChanged
} = batchCreateSelector(getUserInterface, fromUserInterface);

export const getRetrieveUrl = (state, ...id) => {
    const category = getLocation(state);
    return `${state.url}/${state.domains[category]}/${category === 'article' ? 'article' : 'publication'}/retrieve/${id.join('/')}`;
};

export const getCurrentPage = (state) => {
    return fromSearchResultSelectors.getCurrentPage(state.searchResult, getLocation(state));
};

export const getCurrentPageRecords = (state) => {
    return fromSearchResultSelectors.getCurrentPageRecords(state.searchResult, getLocation(state));
};
export const getPaginationData = (state) => {
    return fromSearchResultSelectors.getPaginationData(state.searchResult, getLocation(state));
};
export const getRecordById = (state, id) => {
    return fromSearchResultSelectors.getRecordById(state.searchResult, getLocation(state), id);
};

export const getQueryListLetters = (state) => {
    return fromQueryList.getLetters(state.queryList, getLocation(state));
};
export const getQueryListField = (state, index) => {
    return fromQueryList.getField(state.queryList, getLocation(state), index);
};
export const getQueryListTerm = (state, index) => {
    return fromQueryList.getTerm(state.queryList, getLocation(state), index);
};
export const getQueryListBoolean = (state, index) => {
    return fromQueryList.getBoolean(state.queryList, getLocation(state), index);
};
export const getQueryList = (state) => {
    return fromQueryList.getQueryList(state.queryList, getLocation(state));
};

export const getArticleLinkById = (state, id) => {
    return fromArticleLink.getById(state.articleLink, id);
};

export const getSearchByLocation = createSelector(state => state.search, getLocation, fromSearch.getSearchByLocation);

export const getSearchValueByName = createSelector(
    getSearchByLocation,
    (_, name) => name,
    fromSearch.getSearchValueByName
);

export const getLogin = (state) => state.login;

export const getLimiterValueByName = (state, name) => fromLimiters.getValueByName(state.limiters, getLocation(state), name);

export const getCurrentDomain = (state) => fromDomains.getCurrentDomain(state.domains, getLocation(state));

export const getDomains = (state) => state.domains;

export const getFacetData = (state) => fromFacets.getFacetData(state.facets, getLocation(state));

export const getActiveFacetValues = (state) => fromFacets.getActiveFacetValues(state.facets, getLocation(state));

export const isNoticeShown = (state, id) => fromNotice.isNoticeShown(state.notice, getLocation(state), id);
export const getNoticeById = (state, id) => fromNotice.getNoticeById(state.notice, getLocation(state), id);
export const getNoticesByIds = (state, ids) => fromNotice.getNoticesByIds(state.notice, getLocation(state), ids);
export const getMissingNoticeIds = (state, ids) => fromNotice.getMissingNoticeIds(state.notice, getLocation(state), ids);

export const isRecordSelected = (state, id) => fromSelectedRecord.isRecordSelected(state.selectedRecord, getLocation(state), id);

export const getError = (state) => state.error;

export const isUserLogged = (state) => fromLogin.isUserLogged(state.login);
