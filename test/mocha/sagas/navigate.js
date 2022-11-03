import { put, select } from 'redux-saga/effects';

import { navigate } from '../../../lib/sagas/navigate';

import actions, { NAVIGATE } from '../../../lib/actions';
import * as fromState from '../../../lib/selectors';

describe('sagas navigate', function() {
    let iterator;
    it('should put retrieveDatabase when location is database', function() {
        iterator = navigate({ type: NAVIGATE, location: 'database' });
        let next = iterator.next();
        assert.deepEqual(next.value, put(actions.retrieveDatabase()));
        next = iterator.next();
        assert.isTrue(next.done);
    });
    it('should select getCurrentSearch and getSearchQuery when location is not database', function() {
        iterator = navigate({ type: NAVIGATE, location: 'article' });
        let next = iterator.next();
        assert.deepEqual(next.value, select(fromState.getCurrentSearch));
        next = iterator.next({ previousQuery: 'foo' });
        assert.deepEqual(next.value, select(fromState.getSearchQuery));
    });
    it('should do nothing when previousQuery is equal to searchQuery', function() {
        iterator = navigate({ type: NAVIGATE, location: 'article' });
        let next = iterator.next();
        next = iterator.next({
            previousQuery: {
                queries: [
                    {
                        boolean: 'AND',
                        term: '',
                        suggestedTerms: [],
                        field: null,
                        key: 'initial',
                    },
                ],
                limiters: {
                    peerReviewed: false,
                },
                activeFacets: {},
                sort: 'relevance',
                resultsPerPage: 20,
                domain: 'INSHS',
            },
        });
        next = iterator.next({
            queries: [
                {
                    boolean: 'AND',
                    term: '',
                    suggestedTerms: [],
                    field: null,
                    key: 'initial',
                },
            ],
            limiters: {
                peerReviewed: false,
            },
            activeFacets: {},
            sort: 'relevance',
            resultsPerPage: 20,
            domain: 'INSHS',
        });
        assert.isTrue(next.done);
    });
    it('should put search when previousQuery and searchQuery are different', function() {
        iterator = navigate({ type: NAVIGATE, location: 'article' });
        let next = iterator.next();
        next = iterator.next({
            previousQuery: {
                queries: [
                    {
                        boolean: 'AND',
                        term: '',
                        suggestedTerms: [],
                        field: null,
                        key: 'initial',
                    },
                ],
                limiters: {
                    peerReviewed: false,
                },
                activeFacets: {},
                sort: 'relevance',
                resultsPerPage: 20,
                domain: 'INSHS',
            },
        });
        next = iterator.next({
            queries: [
                {
                    boolean: 'AND',
                    term: 'covid',
                    suggestedTerms: [],
                    field: null,
                    key: 'initial',
                },
            ],
            limiters: {
                peerReviewed: false,
            },
            activeFacets: {},
            sort: 'relevance',
            resultsPerPage: 20,
            domain: 'INSHS',
        });
        assert.deepEqual(next.value, put(actions.search('article')));
        next = iterator.next();
        assert.isTrue(next.done);
    });
});
