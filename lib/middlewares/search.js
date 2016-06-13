import _ from 'lodash';

import buildQueryString from '../services/buildQueryString';
import actions, {
    ARTICLE,
    PUBLICATION,
    A2Z,
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
        currentPage: state[type].searchResult.currentPage,
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
    case ARTICLE.PAGE_LOAD:
        if (state.article.searchResult[state.article.searchResult.currentPage]) {
            break;
        }
        triggerSearch(state, 'article', store.dispatch);
        break;
    case ARTICLE.SEARCH_TERM:
    case ARTICLE.LIMIT_SEARCH:
    case ARTICLE.APPLY_FACET:
    case ARTICLE.LINKED_SEARCH:
    case ARTICLE.CHANGE_SORT:
    case ARTICLE.CHANGE_RESULTS_PER_PAGE:
    case RELOAD_HISTORY:
        triggerSearch(state, 'article', store.dispatch);
        break;
    case PUBLICATION.PAGE_LOAD:
        if (state.publication.searchResult[state.publication.searchResult.currentPage]) {
            break;
        }
        triggerSearch(state, 'publication', store.dispatch);
        break;
    case PUBLICATION.SEARCH_TERM:
    case PUBLICATION.LIMIT_SEARCH:
    case PUBLICATION.APPLY_FACET:
    case PUBLICATION.CHANGE_SORT:
    case PUBLICATION.CHANGE_RESULTS_PER_PAGE:
        triggerSearch(state, 'publication', store.dispatch);
        break;
    case A2Z.PAGE_LOAD:
        if (state.a2z.searchResult[state.a2z.searchResult.currentPage]) {
            break;
        }
        triggerSearch(state, 'a2z', store.dispatch);
        break;
    case A2Z.CHANGE_RESULTS_PER_PAGE:
    case A2Z.SEARCH_TERM:
        triggerSearch(state, 'a2z', store.dispatch);
        break;
    }
};
