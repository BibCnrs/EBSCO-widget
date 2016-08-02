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
import buildQueryString from '../services/buildQueryString';

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
        return reducer({
            url: state.url,
            dbUrl: state.dbUrl
        }, action);
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

export const getProps = (_, props) => props;

export const getPausedAction = state => state.pausedAction;

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
    [getCurrentSearchResult, getProps],
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
    [getCurrentQueryList, getProps],
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
    [getCurrentSearch, getProps],
    fromSearch
);

export const getLimiters = state => state.limiters;
export const getCurrentLimiters = createSelector(
    [getLimiters, getLocation],
    (limiters, location) => limiters[location]
);
export const getLimiterValueByName = createSelector(
    [getCurrentLimiters, getProps],
    fromLimiters.getValueByName
);

export const getDomains = (state) => state.domains;
export const getAllDomains = createSelector(
    [getDomains],
    (domains) => domains.all
);
export const isDomainAvailable = createSelector(
    [getDomains, getLocation],
    fromDomains.isDomainAvailable
);

export const getCurrentDomain = createSelector(
    [getDomains, getLocation],
    (domains, location) => domains[location]
);

export const canUserSearch = createSelector(
    [getLocation, isDomainAvailable],
    (location, isDomainAvailable) => location !== 'article' || isDomainAvailable
);

export const canUserRetrieve = isDomainAvailable;

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
    getNoticeById
} = batchCreateSelector(
    [getCurrentNotice, getProps],
    fromNotice
);

export const getSelectedRecord = (state) => state.selectedRecord;
export const getCurrentSelectedRecord = createSelector(
    [getSelectedRecord, getLocation],
    (selectedRecord, location) => selectedRecord[location]
);
export const makeIsRecordSelected = () => createSelector(
    [ getCurrentSelectedRecord, getProps],
    fromSelectedRecord.isRecordSelected
);
export const getSelectedRecordIds = createSelector(
    [getCurrentSelectedRecord],
    fromSelectedRecord.getSelectedRecordIds
);
export const getRecordsRisLinkByIds = createSelector(
    [getCurrentSearchResult, getProps],
    fromSearchResultSelectors.getRisLinkByIds
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

export const getSearchQuery = createSelector(
    [
        getCurrentQueryList,
        getCurrentLimiters,
        getActiveFacetValues,
        getSearchSort,
        getSearchResultsPerPage,
        getCurrentDomain
    ],
    (queries, limiters, activeFacets, sort, resultsPerPage, domain) => ({
        queries,
        limiters,
        activeFacets,
        sort,
        resultsPerPage,
        domain
    })
);

export const getQueryString = createSelector(
    [
        getCurrentQueryList,
        getCurrentLimiters,
        getActiveFacetValues,
        getSearchSort,
        getSearchResultsPerPage,
        getCurrentPage
    ],
    (queries, limiters, activeFacets, sort, resultsPerPage, currentPage) => buildQueryString({
        queries,
        ...limiters,
        activeFacets,
        sort,
        resultsPerPage,
        currentPage
    })
);

export const getHistory = (state) => state.history;

export const getUrl = state => state.url;
export const getRequest = (url, token) => {
    return {
        url,
        config: {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    };
};
export const getRecordNoticeIdentifierById = createSelector(
    [getCurrentSearchResult, getLocation, getProps],
    fromSearchResultSelectors.getRecordNoticeIdentifierById
);
export const getRetrieveUrl = createSelector(
    [getUrl, getCurrentDomain, getRecordNoticeIdentifierById],
    (url, domain, ids) => {
        if (typeof ids === 'string') {
            return `${url}/${domain}/publication/retrieve/${ids}`;
        }

        return `${url}/${domain}/article/retrieve/${ids.dbId}/${ids.an}`;
    }
);
export const getRetrieveRequest = createSelector(
    [getRetrieveUrl, getToken],
    getRequest
);
export const getRetrieveLinkUrl = createSelector(
    [getUrl, getCurrentDomain, getRecordNoticeIdentifierById],
    (url, domain, ids) => {
        if (typeof ids === 'string') {
            throw new Error('Cannot retrieve link for a publication');
        }

        return `${url}/${domain}/article/retrieve_pdf/${ids.dbId}/${ids.an}`;
    }
);
export const getRetrieveLinkRequest = createSelector(
    [getRetrieveLinkUrl, getToken],
    getRequest
);
export const getSearchUrl = createSelector(
    [getUrl, getLocation, getCurrentDomain, getQueryString],
    (url, location, domain, queryString) =>
        `${url}/${domain}/${location === 'article' ? 'article' : 'publication' }/search?${queryString}`
);
export const getDomainsRequest = createSelector(
    [getUrl],
    (url) => ({
        url: `${url}/domains`,
        config: {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    })
);
export const getGetLoginRequest = createSelector(
    [getUrl],
    (url) => {
        return {
            url: `${url}/getLogin`,
            config: {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        };
    }
);
export const getApiLoginRequest = createSelector(
    [getUrl, getProps],
    (url, data) => {
        return {
            url: `${url}/login`,
            config: {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        };
    }
);

export const getSearchRequest = createSelector(
    [getSearchUrl, getToken],
    getRequest
);

export const getRisRequestForIds = createSelector(
    [getRecordsRisLinkByIds, getUrl],
    (links, url) => ({
        url: `${url}/retrieve_ris`,
        config: {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                links
            })
        }
    })
);

export const isInitialized = createSelector(
    [getAllDomains],
    (domains) => !!domains.length
);

export const isExportingNotice = createSelector(
    [getUserInterface, getProps],
    fromUserInterface.isExportingNotice
);

export const isExporting = createSelector(
    [getUserInterface],
    fromUserInterface.isExporting
);
