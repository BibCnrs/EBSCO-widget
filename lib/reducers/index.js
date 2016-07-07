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

const batchCreateSelector = (parameterSelector, fromSelectors) => {
    return Object.keys(fromSelectors)
    .filter(selectorName => _.isFunction(fromSelectors[selectorName]))
    .reduce((extendedSelectors, selectorName) => ({
        ...extendedSelectors,
        [selectorName]: createSelector(parameterSelector, fromSelectors[selectorName])
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

export const getBatchRetrieveRequest = (state, ids) => {
    const category = getLocation(state);
    const token = getToken(state);
    const records = getRecordsByIds(state, ids);

    return {
        url: `${state.url}/${state.domains[category]}/article/batch_retrieve`,
        config: {
            method: 'POST',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ids: records.map(({ id, dbId, an }) => ({ id, dbId, an }))
            })
        }
    };
};

export const getSearchResult = (state) => state.searchResult;
export const getCurrentSearchResult = createSelector(
    [getSearchResult, getLocation],
    (searchResult, location) => searchResult[location]
);
export const {
    getCurrentPage,
    getCurrentPageData,
    getCurrentPageRecords,
    getPaginationData,
    getRecordById,
    getRecordsByIds
} = batchCreateSelector(
    [getCurrentSearchResult, (_, props) => props],
    fromSearchResultSelectors
);

export const getQueryList = (state) => state.queryList;
export const getCurrentQueryList = createSelector(
    [getQueryList, getLocation],
    (queryList, location) => queryList[location]
);
export const {
    getQueryListLetters,
    getQueryListField,
    getQueryListTerm,
    getQueryListBoolean
} = batchCreateSelector(
    [getCurrentQueryList, (_, index) => index],
    fromQueryList
);

export const getArticleLink = (state) => state.articleLink;
export const getArticleLinkById = createSelector(
    [getArticleLink, (_, id) => id],
    fromArticleLink.getById
);

export const getSearch = (state) => state.search;
export const getCurrentSearch = createSelector(
    [getSearch, getLocation],
    (search, location) => search[location]
);
export const {
    getSearchResultsPerPage,
    getSearchSort,
    getSearchDateRange,
    getSearchStatus
} = batchCreateSelector(
    [getCurrentSearch, (_, name) => name],
    fromSearch
);

export const getLimiters = state => state.limiters;
export const getCurrentLimiters = createSelector(
    [getLimiters, getLocation],
    (limiters, location) => limiters[location]
);
export const getLimiterValueByName = createSelector(
    [getCurrentLimiters, (_, name) => name],
    fromLimiters.getValueByName
);

export const getDomains = (state) => state.domains;
export const getCurrentDomain = createSelector(
    [getDomains, getLocation],
    (domains, location) => domains[location]
);

export const getFacets = (state) => state.facets;
export const getCurrentFacets = createSelector(
    [getFacets, getLocation],
    (facets, location) => facets[location]
);
export const getFacetData = createSelector(
    [getCurrentFacets],
    fromFacets.getFacetData
);
export const getActiveFacetValues = createSelector(
    [getCurrentFacets],
    fromFacets.getActiveFacetValues
);

export const getNotice = state => state.notice;
export const getCurrentNotice = createSelector(
    [getNotice, getLocation],
    (notice, location) => notice[location]
);
export const {
    isNoticeShown,
    getNoticeById,
    getNoticesByIds,
    getMissingNoticeIds
} = batchCreateSelector(
    [getCurrentNotice, (_, props) => props],
    fromNotice
);

export const getSelectedRecord = (state) => state.selectedRecord;
export const getCurrentSelectedRecord = createSelector(
    [getSelectedRecord, getLocation],
    (selectedRecord, location) => selectedRecord[location]
);
export const makeIsRecordSelected = () => createSelector(
    [ getCurrentSelectedRecord, (_, id) => id ],
    fromSelectedRecord.isRecordSelected
);
export const getSelectedRecordIds = createSelector(
    [getCurrentSelectedRecord],
    fromSelectedRecord.getSelectedRecordIds
);

export const getError = (state) => state.error;

export const getLogin = (state) => state.login;
export const isUserLogged = createSelector(
    [getLogin],
    fromLogin.isUserLogged
);
export const getToken = createSelector(
    [getLogin],
    fromLogin.getToken
);
