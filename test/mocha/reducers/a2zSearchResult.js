import a2zSearchResult, { defaultState } from '../../../lib/reducers/a2zSearchResult';
import a2zRecordList from '../../../lib/reducers/a2zRecordList';

import {
    LOGOUT,
    A2Z
} from '../../../lib/actions';

const {
    SEARCH_TERM,
    SEARCH_SUCCESS,
    PAGE_LOAD
} = A2Z;

describe('reducers a2zSearchResult', function () {

    it('should set [action.response.currentPage] to action.response.results if action is SEARCH_SUCCESS', function () {
        assert.deepEqual(
            a2zSearchResult({ maxPage: 0 }, {
                type: SEARCH_SUCCESS,
                response: {
                    maxPage: 10,
                    totalHits: 200,
                    results: ['results data'],
                    currentPage: 2
                }
            }),
            {
                maxPage: 10,
                totalHits: 200,
                2: ['results data'],
                currentPage: 2
            }
        );
    });

    it('should return default state if action is A2Z_SEARCH_TERM', function () {
        assert.deepEqual(
            a2zSearchResult({
                maxPage: 10,
                totalHits: 200,
                2: ['results data'],
                currentPage: 2
            }, { type: SEARCH_TERM }),
            defaultState
        );
    });

    it('should return default state if action is LOGOUT', function () {
        assert.deepEqual(
            a2zSearchResult({
                maxPage: 10,
                totalHits: 200,
                2: ['results data'],
                currentPage: 2
            }, { type: LOGOUT }),
            defaultState
        );
    });

    it('should set currentPage to action.page if action is PAGE_LOAD', function () {
        assert.deepEqual(
            a2zSearchResult({ maxPage: 0 }, {
                type: PAGE_LOAD,
                page: 7
            }),
            {
                maxPage: 0,
                currentPage: 7
            }
        );
    });

    it('should return state on other action', function () {
        assert.deepEqual(
            a2zSearchResult({ some: 'state' }, {
                type: 'OTHER_ACTION'
            }),
            { some: 'state' }
        );
    });

    it('should pass action to a2zRecordList if state has currentPage set', function () {
        const action = {
            type: 'OTHER_ACTION'
        };
        const state = {
            some: 'state',
            currentPage: 7
        };
        assert.deepEqual(
            a2zSearchResult(state, action),
            {
                some: 'state',
                currentPage: 7,
                '7': a2zRecordList(state[7], action)
            }
        );
    });

});
