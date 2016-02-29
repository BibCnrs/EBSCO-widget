import articleSearchResult, { defaultState } from '../../../lib/reducers/articleSearchResult';
import articleRecordList from '../../../lib/reducers/articleRecordList';

import {
    ARTICLE,
    RELOAD_HISTORY,
    LOGOUT
} from '../../../lib/actions';

describe('reducers articleSearchResult', function () {

    it('should set [action.response.currentPage] to action.response.results if action is SEARCH_SUCCESS', function () {
        assert.deepEqual(
            articleSearchResult({ maxPage: 0 }, {
                type: ARTICLE.SEARCH_SUCCESS,
                response: {
                    maxPage: 10,
                    totalHits: 200,
                    results: ['results data'],
                    currentPage: 2,
                    dateRange: {
                        min: 1515,
                        max: 2015
                    }
                }
            }),
            {
                maxPage: 10,
                totalHits: 200,
                2: ['results data'],
                currentPage: 2,
                dateRange: {
                    min: 1515,
                    max: 2015
                }
            }
        );
    });

    it('should return default state if action is ARTICLE_SEARCH_TERM, ARTICLE_LIMIT_SEARCH, RELOAD_HISTORY, LOGOUT or TRIGGER_EBSCO_ACTION', function () {
        const actionTypes = [
            ARTICLE.SEARCH_TERM,
            ARTICLE.LIMIT_SEARCH,
            RELOAD_HISTORY,
            LOGOUT
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
                type: ARTICLE.PAGE_LOAD,
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

    it('should pass action to articleRecordList if state has currentPage set', function () {
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
                '7': articleRecordList(state[7], action)
            }
        );
    });

});
