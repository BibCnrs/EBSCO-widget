import articleSearchResult, { defaultState } from '../../../lib/reducers/articleSearchResult';
import recordList from '../../../lib/reducers/recordList';

import {
    SEARCH_SUCCESS,
    ARTICLE,
    RELOAD_HISTORY,
    TRIGGER_EBSCO_ACTION,
    LOGOUT,
    PAGE_LOAD
} from '../../../lib/actions';

describe('reducers articleSearchResult', function () {

    it('should set [action.response.currentPage] to action.response.results if action is SEARCH_SUCCESS', function () {
        assert.deepEqual(
            articleSearchResult({ maxPage: 0 }, {
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

    it('should return default state if action is ARTICLE_SEARCH_TERM, ARTICLE_LIMIT_SEARCH, RELOAD_HISTORY, LOGOUT or TRIGGER_EBSCO_ACTION', function () {
        const actionTypes = [
            ARTICLE.SEARCH_TERM,
            ARTICLE.LIMIT_SEARCH,
            RELOAD_HISTORY,
            LOGOUT,
            TRIGGER_EBSCO_ACTION
        ];

        actionTypes.map((type) => assert.deepEqual(
            articleSearchResult({
                maxPage: 10,
                totalHits: 200,
                2: ['results data'],
                currentPage: 2
            }, { type }),
            defaultState
        ));
    });

    it('should set currentPage to action.page if action is PAGE_LOAD', function () {
        assert.deepEqual(
            articleSearchResult({ maxPage: 0 }, {
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
            articleSearchResult({ some: 'state' }, {
                type: 'OTHER_ACTION'
            }),
            { some: 'state' }
        );
    });

    it('should pass action to recordList if state has currentPage set', function () {
        const action = {
            type: 'OTHER_ACTION'
        };
        const state = {
            some: 'state',
            currentPage: 7
        };
        assert.deepEqual(
            articleSearchResult(state, action),
            {
                some: 'state',
                currentPage: 7,
                '7': recordList(state[7], action)
            }
        );
    });

});
