import _ from 'lodash';

import buildQueryString from '../services/buildQueryString';
import * as fromSearchResult from '../reducers/searchResult';
import actions, {
    PAGE_LOAD,
    SEARCH_TERM,
    LIMIT_SEARCH,
    APPLY_FACET,
    CHANGE_RESULTS_PER_PAGE,
    ARTICLE,
    PUBLICATION,
    RELOAD_HISTORY
} from '../actions';

export default store => next => action => search(store, next, action);

export const getTerms = (firstLetter, secondLetter) => {
    if(firstLetter === '') {
        return [''];
    }
    const firstLetters = firstLetter === '#' ? _.range(10) : [firstLetter];
    const secondLetters = secondLetter === '#' ? _.range(10) : [secondLetter];

    return firstLetters.reduce((result, letter1) => {
        return [
            ...result,
            ...secondLetters.map((letter2) => {
                return `${letter1}${letter2}*`;
            })
        ];
    }, []);

};

export const getQueries = (type, state) => {
    const { firstLetter, secondLetter, term, field, queries } = state[type].search;
    switch(type) {
    case 'article':
        return queries;
    case 'publication':
        return [{ term: term, field: field }];
    case 'a2z':

        return getTerms(firstLetter, secondLetter).map(term => {
            return { term, field, boolean: 'OR' };
        });
    }
};

export const triggerSearch = (state, type, dispatch, action) => {
    const { limiters, activeFacets, sort, resultsPerPage } = state[type].search;
    const domain = state.domains[type];
    if (!domain) {
        return;
    }
    const queries = getQueries(type, state);
    if (!queries[0].term) {
        return;
    }
    const queryString = buildQueryString({
        queries,
        ...limiters,
        resultsPerPage,
        currentPage: state.searchResult[type].currentPage,
        activeFacets: activeFacets,
        action,
        sort
    });

    dispatch(
        actions[type].search(
            `${state.url}/${domain}/${type === 'article' ? 'article' : 'publication' }/search?${queryString}`,
            state.login.token,
            {
                queries,
                domain,
                limiters,
                activeFacets,
                action
            }
        )
    );
};

export const search = function search(store, next, action) {
    next(action);
    const state = store.getState();

    switch(action.type) {
    case PAGE_LOAD:
        if (fromSearchResult.getCurrentPage(action.category)) {
            break;
        }
        triggerSearch(state, action.category, store.dispatch);
        break;
    case SEARCH_TERM:
    case LIMIT_SEARCH:
    case APPLY_FACET:
    case CHANGE_RESULTS_PER_PAGE:
    case RELOAD_HISTORY:
        triggerSearch(state, action.category, store.dispatch);
        break;
    case ARTICLE.CHANGE_SORT:
    case ARTICLE.LINKED_SEARCH:
        triggerSearch(state, 'article', store.dispatch);
        break;
    case PUBLICATION.CHANGE_SORT:
        triggerSearch(state, 'publication', store.dispatch);
        break;
    }
};
