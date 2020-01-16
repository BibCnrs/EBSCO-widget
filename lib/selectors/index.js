import { createSelector } from 'reselect';
import _ from 'lodash';

import * as fromLogin from '../reducers/login';
import * as fromUserInterface from '../reducers/userInterface';
import * as fromDomains from '../reducers/domains';
import * as fromSelectedRecord from '../reducers/selectedRecord';
import * as fromNotice from '../reducers/notice';
import * as fromFacets from '../reducers/facets';
import * as fromLimiters from '../reducers/limiters';
import * as fromSearchResultSelectors from '../reducers/searchResult';
import * as fromSearch from '../reducers/search';
import * as fromHistory from '../reducers/history';
import * as fromQueryList from '../reducers/queryList';
import * as fromExactMatch from '../reducers/exactMatch';
import * as fromDatabases from '../reducers/databases';
import * as fromFavouriteResources from '../reducers/favouriteResources';
import * as fromProfile from '../reducers/profile';
import { alertEnabled } from '../config/article';
import buildQueryString from '../services/buildQueryString';

const batchCreateSelector = (parameterSelector, fromSelectors) => {
    return Object.keys(fromSelectors)
        .filter(selectorName => _.isFunction(fromSelectors[selectorName]))
        .reduce(
            (extendedSelectors, selectorName) => ({
                ...extendedSelectors,
                [selectorName]: createSelector(
                    parameterSelector,
                    fromSelectors[selectorName],
                ),
            }),
            {},
        );
};

export const getProps = (_, props) => props;

export const getPausedAction = state => state.pausedAction;

export const getUserInterface = state => state.userInterface;
export const {
    getLocation,
    getLanguage,
    isLanguageReadOnly,
    isLoginShown,
    isProfileShown,
    isLimiterShown,
    isResultShown,
    isHistoryShown,
    hasLimiterChanged,
    shouldShowPublicationSort,
    isProfileAnimated,
} = batchCreateSelector(getUserInterface, fromUserInterface);

export const getSearchResult = state => state.searchResult;
export const getCurrentSearchResult = createSelector(
    [getSearchResult, getLocation],
    (searchResult, location) => searchResult[location],
);
export const hasPublicationSearchResult = createSelector(
    [getSearchResult],
    searchResult =>
        searchResult.publication && searchResult.publication.totalHits > 0,
);
export const {
    getCurrentPage,
    getCurrentPageData,
    getCurrentPageRecords,
    getPaginationData,
    hasNoFullTextResult,
    getRecordById,
    getRecordsByIds,
} = batchCreateSelector(
    [getCurrentSearchResult, getProps],
    fromSearchResultSelectors,
);

export const getQueryList = state => state.queryList;
export const getCurrentQueryList = createSelector(
    [getQueryList, getLocation],
    (queryList, location) => queryList[location] || [],
);
export const {
    getQueryListLetters,
    getQueryListField,
    getQueryListTerm,
    getExactMatchQuery,
    canExactMatch,
    getQueryListSuggestedTerms,
    getQueryListBoolean,
    isQueryListInA2zMode,
} = batchCreateSelector([getCurrentQueryList, getProps], fromQueryList);

export const getSearch = state => state.search;
export const getCurrentSearch = createSelector(
    [getSearch, getLocation],
    (search, location) => search[location] || {},
);
export const {
    getSearchResultsPerPage,
    getSearchSort,
    getSearchDateRange,
    getSearchStatus,
    isSearchInA2zMode,
} = batchCreateSelector([getCurrentSearch, getProps], fromSearch);

export const getExactMatch = state => state.exactMatch;
export const {
    getExactMatchNotice,
    getExactMatchPublicationId,
} = batchCreateSelector(getExactMatch, fromExactMatch);

export const getLimiters = state => state.limiters;
export const getCurrentLimiters = createSelector(
    [getLimiters, getLocation],
    (limiters, location) => limiters[location] || {},
);
export const getLimiterValueByName = createSelector(
    [getCurrentLimiters, getProps],
    fromLimiters.getValueByName,
);
export const isDefaultLimiter = createSelector(
    [getLimiters, getLocation],
    fromLimiters.isDefaultLimiter,
);

export const getDomains = state => state.domains;
export const getAllDomains = createSelector(
    [getDomains, getProps],
    (domains, category) =>
        category === 'article'
            ? domains.available
            : _.uniq([...domains.available, ...domains.all]),
);
export const getAvailableDomains = createSelector(
    [getDomains],
    domains => domains.available,
);
export const getRights = createSelector(
    [getDomains],
    domains => domains.rights,
);
export const isDomainAvailable = createSelector(
    [getDomains, getLocation],
    fromDomains.isDomainAvailable,
);

export const getCurrentDomain = createSelector(
    [getDomains, getLocation],
    (domains, location) => domains[location],
);

export const getCurrentGate = createSelector(
    [getDomains, getLocation],
    fromDomains.getCurrentGate,
);

export const canUserSearch = createSelector(
    [getLocation, isDomainAvailable],
    (location, isDomainAvailable) =>
        location !== 'article' || isDomainAvailable,
);

export const canUserRetrieve = isDomainAvailable;

export const isQueryReady = createSelector(
    [getCurrentQueryList],
    fromQueryList.isQueryReady,
);

export const getFacets = state => state.facets;
export const getCurrentFacets = createSelector(
    [getFacets, getLocation],
    (facets, location) => facets[location] || {},
);
export const getFacetData = createSelector(
    [getCurrentFacets],
    fromFacets.getFacetData,
);
export const getActiveFacet = createSelector(
    [getCurrentFacets],
    fromFacets.getActiveFacet,
);
export const hasActiveFacet = createSelector(
    [getCurrentFacets],
    fromFacets.hasActiveFacet,
);
export const getActiveFacetValues = createSelector(
    [getCurrentFacets],
    fromFacets.getActiveFacetValues,
);

export const getNotice = state => state.notice;
export const getCurrentNotice = createSelector(
    [getNotice, getLocation],
    (notice, location) => notice[location],
);
export const { isNoticeShown, getNoticeById } = batchCreateSelector(
    [getCurrentNotice, getProps],
    fromNotice,
);

export const getSelectedRecord = state => state.selectedRecord;
export const getCurrentSelectedRecord = createSelector(
    [getSelectedRecord, getLocation],
    (selectedRecord, location) => selectedRecord[location] || [],
);
export const makeIsRecordSelected = () =>
    createSelector(
        [getCurrentSelectedRecord, getProps],
        fromSelectedRecord.isRecordSelected,
    );

export const isPageSelected = createSelector(
    [getCurrentSelectedRecord, getCurrentPageData],
    fromSelectedRecord.isRecordSelected,
);

export const getSelectedRecordIds = createSelector(
    [getCurrentSelectedRecord],
    fromSelectedRecord.getSelectedRecordIds,
);
export const getRecordsExportLinkByIds = createSelector(
    [getCurrentSearchResult, getProps],
    fromSearchResultSelectors.getExportLinkByIds,
);

export const getError = state => state.error;

export const getLogin = state => state.login;

export const {
    isLoggingWithRenater,
    isUserLogged,
    getToken,
    getLoginData,
    getUserName,
} = batchCreateSelector([getLogin], fromLogin);

export const getSearchQuery = createSelector(
    [
        getCurrentQueryList,
        getCurrentLimiters,
        getActiveFacet,
        getSearchSort,
        getSearchResultsPerPage,
        getCurrentDomain,
    ],
    (queries, limiters, activeFacets, sort, resultsPerPage, domain) => ({
        queries,
        limiters,
        activeFacets,
        sort,
        resultsPerPage,
        domain,
    }),
);

export const getQueryString = createSelector(
    [
        getCurrentQueryList,
        getCurrentLimiters,
        getActiveFacet,
        getSearchSort,
        getSearchResultsPerPage,
        getCurrentPage,
    ],
    (queries, limiters, activeFacets, sort, resultsPerPage, currentPage) =>
        buildQueryString({
            queries,
            ...limiters,
            activeFacets,
            sort,
            resultsPerPage,
            currentPage,
        }),
);

export const getExactMatchQueryString = createSelector(
    [getExactMatchQuery],
    queries =>
        buildQueryString({
            queries,
            sort: 'relevance',
            resultsPerPage: 1,
            currentPage: 1,
        }),
);

export const getHistory = state => state.history;

export const hasHistory = createSelector([getHistory], fromHistory.hasHistory);

export const getUrl = state => state.url;

export const getRenaterLoginUrl = createSelector(
    [getUrl],
    url =>
        `${url}/login_renater/?origin=${encodeURIComponent(
            window.location.href,
        )}`,
);

export const getRequest = (url, token) => {
    return {
        url,
        config: {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
    };
};
export const getRecordNoticeIdentifierById = createSelector(
    [getCurrentSearchResult, getLocation, getProps],
    fromSearchResultSelectors.getRecordNoticeIdentifierById,
);
export const getRecordIdsWithMissingLink = createSelector(
    [getCurrentSearchResult, () => 'article'],
    fromSearchResultSelectors.getRecordIdsWithMissingLink,
);
export const getRetrieveUrl = createSelector(
    [getUrl, getCurrentDomain, getRecordNoticeIdentifierById],
    (url, domain, ids) => {
        if (typeof ids === 'string') {
            return `${url}/${domain}/publication/retrieve/${ids}`;
        }

        return `${url}/${domain}/article/retrieve/${ids.dbId}/${ids.an}`;
    },
);
export const getRetrieveRequest = createSelector(
    [getRetrieveUrl, getToken],
    getRequest,
);

export const getExactMatchRetrieveUrl = createSelector(
    [getUrl, getCurrentDomain, getExactMatchPublicationId],
    (url, domain, id) => `${url}/${domain}/publication/retrieve/${id}`,
);
export const getExactMatchRetrieveRequest = createSelector(
    [getExactMatchRetrieveUrl, getToken],
    getRequest,
);
export const getRetrieveLinkUrl = createSelector(
    [getUrl, getCurrentDomain, getRecordNoticeIdentifierById],
    (url, domain, ids) => {
        if (typeof ids === 'string') {
            throw new Error('Cannot retrieve link for a publication');
        }

        return `${url}/${domain}/article/retrieve_pdf/${ids.dbId}/${ids.an}`;
    },
);
export const getRetrieveLinkRequest = createSelector(
    [getRetrieveLinkUrl, getToken],
    getRequest,
);
export const getRetrieveDatabaseUrl = createSelector(
    [getUrl, getCurrentDomain],
    url => {
        return `${url}/databases`;
    },
);
export const getRetrieveDatabaseRequest = createSelector(
    [getRetrieveDatabaseUrl],
    getRequest,
);
export const getSearchUrl = createSelector(
    [getUrl, getLocation, getCurrentDomain, getQueryString],
    (url, location, domain, queryString) =>
        `${url}/${domain}/${
            location === 'article' ? 'article' : 'publication'
        }/search?${queryString}`,
);
export const getExactMatchUrl = createSelector(
    [getUrl, getCurrentDomain, getExactMatchQueryString],
    (url, domain, queryString) =>
        `${url}/${domain}/publication/search?${queryString}`,
);
export const getDomainsRequest = createSelector([getUrl], url => ({
    url: `${url}/domains`,
    config: {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    },
}));
export const getGetLoginRequest = createSelector([getUrl], url => {
    return {
        url: `${url}/getLogin`,
        config: {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
    };
});
export const getApiLoginRequest = createSelector(
    [getUrl, getLoginData],
    (url, data) => {
        return {
            url: `${url}/login`,
            config: {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            },
        };
    },
);

export const getUpdateProfileData = state => ({
    favorite_domain: state.profile.favorite_domain,
});

export const getApiUpdateProfileRequest = createSelector(
    [getUrl, getUpdateProfileData],
    (url, data) => {
        return {
            url: `${url}/profile`,
            config: {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            },
        };
    },
);

export const getSearchRequest = createSelector(
    [getSearchUrl, getToken],
    getRequest,
);

export const getExactMatchRequest = createSelector(
    [getExactMatchUrl, getToken],
    getRequest,
);

export const getExportRequestForIds = createSelector(
    [getRecordsExportLinkByIds, getUrl],
    (links, url) => ({
        url: `${url}/retrieve_ris`,
        config: {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                links,
            }),
        },
    }),
);

export const isExportingNotice = createSelector(
    [getUserInterface, getProps],
    fromUserInterface.isExportingNotice,
);

export const isExporting = createSelector(
    [getUserInterface],
    fromUserInterface.isExporting,
);

export const getDomainChange = createSelector(
    [getDomains],
    fromDomains.getDomainChange,
);

export const {
    getArticleSearchResult,
    getPublicationSearchResult,
} = batchCreateSelector(getSearchResult, fromSearchResultSelectors);

export const articleHasResult = createSelector(
    [getArticleSearchResult],
    fromSearchResultSelectors.hasResult,
);

export const publicationHasResult = createSelector(
    [getPublicationSearchResult],
    fromSearchResultSelectors.hasResult,
);

// undefined is no change
export const getInitialDomains = createSelector(
    [getDomainChange, articleHasResult, publicationHasResult],
    (domainChange, articleHasResult, publicationHasResult) => ({
        article: !articleHasResult ? domainChange.article : undefined,
        publication: !publicationHasResult
            ? domainChange.publication
            : undefined,
        database: domainChange.database,
    }),
);

export const isInA2zMode = createSelector(
    [hasActiveFacet, isDefaultLimiter, isQueryListInA2zMode],
    (activeFacet, defaultLimiter, queryListInA2zMode) =>
        !activeFacet && defaultLimiter && queryListInA2zMode,
);

export const getProfile = state => state.profile;

export const { getProfileId, hasProfile } = batchCreateSelector(
    [getProfile],
    fromProfile,
);

export const isAlertEnabled = state =>
    alertEnabled ? hasProfile(state) : false;

export const hasAccessToFavoriteDomain = createSelector(
    [getAvailableDomains, getProfile],
    (domains = [], { favorite_domain }) =>
        domains && favorite_domain && domains.includes(favorite_domain),
);

export const hasDomainSetFromUrl = createSelector(
    [getDomains],
    domains => domains.setFromUrl,
);

export const getDatabases = state => state.databases;

export const getSortedDatabases = createSelector(
    [getDatabases, getLanguage],
    fromDatabases.getSortedDatabases,
);

export const getFavouriteResources = state => state.favouriteResources;

export const isResourceAdded = createSelector(
    [getFavouriteResources, getProps],
    fromFavouriteResources.isResourceAdded,
);

export const canPersistHistoryOnServer = createSelector(
    [getProfile],
    profile => profile.origin === 'janus',
);

export const getLastHistoryEntry = createSelector(
    getHistory,
    ({ queries }) => queries[0], // history entries are sorted in descending order
);

export const getApiPersistHistoryRequest = createSelector(
    [getUrl, getToken, getLastHistoryEntry],
    (url, token, history) => ({
        url: `${url}/history`,
        config: {
            body: JSON.stringify({ history }),
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
        },
    }),
);

export const getApiLoadHistoryRequest = createSelector(
    [getUrl, getToken],
    (url, token) => ({
        url: `${url}/history`,
        config: {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
    }),
);

export const getApiDeleteHistoryRequest = createSelector(
    [getUrl, getToken],
    (url, token) => ({
        url: `${url}/history`,
        config: {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
        },
    }),
);

export const getApiUpdateFavoriteResourcesRequest = createSelector(
    [getUrl, getToken, getProfileId, getFavouriteResources],
    (url, token, profileId, favouriteResources) => ({
        url: `${url}/favourite_resources/${profileId}`,
        config: {
            body: JSON.stringify({ favouriteResources }),
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'PUT',
        },
    }),
);

export const getApiSaveAlertRequest = createSelector(
    [getUrl, getToken, getProfileId, getProps],
    (url, token, userId, body) => ({
        url: `${url}/search_alert`,
        config: {
            body: JSON.stringify({ ...body, userId }),
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'PUT',
        },
    }),
);

export const getApiRemoveAlertRequest = createSelector(
    [getUrl, getToken, getProps],
    (url, token, historyId) => ({
        url: `${url}/search_alert/${historyId}`,
        config: {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
        },
    }),
);
