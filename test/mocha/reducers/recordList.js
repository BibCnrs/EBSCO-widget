import articleRecordList from '../../../lib/reducers/articleRecordList';
import articleRecord from '../../../lib/reducers/articleRecord';

import {
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    SEARCH_PENDING,
    RETRIEVE_SUCCESS,
    RETRIEVE_LINK_SUCCESS,
    SHOW_NOTICE
} from '../../../lib/actions/article';

describe('reducers articleRecordList', function () {
    const resultList = [
        { name: 'result1', notice: {} },
        { name: 'result2', notice: {} },
        { name: 'result3', notice: {} }
    ];

    it ('should default state to empty arrray if none given', function () {
        assert.deepEqual(articleRecordList(undefined, { type: 'OTHER_ACTION_TYPE' }), []);
    });

    it('should not add a result when action action point to an empty index', function () {
        const state = [ 'first' ];
        assert.deepEqual(
            articleRecordList(state, {
                type: 'WHATEVER',
                index: 1
            }),
            state
        );
    });

    it ('should return default state if action type is LOGOUT', function () {
        assert.deepEqual(articleRecordList([ 'result1', 'result2' ], { type: 'LOGOUT' }), []);
    });

    it ('should return given state if not concernerd by ACTION', function () {
        assert.deepEqual(articleRecordList(resultList, { type: 'OTHER_ACTION_TYPE' }), resultList);
    });

    it ('should return action.reponse if action type is SEARCH_SUCCESS', function () {
        assert.deepEqual(articleRecordList(undefined, { type: SEARCH_SUCCESS, response: { results: resultList } }), resultList);
    });

    it ('should return empty array if action type is SEARCH_ERROR', function () {
        assert.deepEqual(articleRecordList(resultList, { type: SEARCH_ERROR, error: 'error' }), []);
    });

    it ('should return empty array if action type is SEARCH_PENDING', function () {
        assert.deepEqual(articleRecordList(resultList, { type: SEARCH_PENDING }), []);
    });

    it('should pass action RETRIEVE_LINK_SUCCESS with an articleIndex to articleRecord', function () {
        const retrieveLinkAction = {
            type: RETRIEVE_LINK_SUCCESS,
            response: {
                url: 'http://linkToArticle.com'
            },
            articleIndex: 2
        };
        assert.deepEqual(articleRecordList(resultList, retrieveLinkAction), [
            ...resultList.slice(0, 2),
            articleRecord(resultList[2], retrieveLinkAction),
            ...resultList.slice(3)
        ]);
    });

    it('should ignore action RETRIEVE_LINK_SUCCESS if no articleIndex', function () {
        const retrieveLinkAction = {
            type: RETRIEVE_LINK_SUCCESS,
            response: {
                url: 'http://linkToArticle.com'
            }
        };
        assert.deepEqual(articleRecordList(resultList, retrieveLinkAction), resultList);
    });

    it('should ignore action RETRIEVE_LINK_SUCCESS if there is no article at state[articleIndex]', function () {
        const retrieveLinkAction = {
            type: RETRIEVE_LINK_SUCCESS,
            response: {
                url: 'http://linkToArticle.com'
            },
            articleLink: 3
        };
        assert.deepEqual(articleRecordList(resultList, retrieveLinkAction), resultList);
    });

    it('should pass action RETRIEVE_SUCCESS with an articleIndex to articleRecord', function () {
        const retrieveLinkAction = {
            type: RETRIEVE_SUCCESS,
            response: 'notice content',
            articleIndex: 2
        };
        assert.deepEqual(articleRecordList(resultList, retrieveLinkAction), [
            ...resultList.slice(0, 2),
            articleRecord(resultList[2], retrieveLinkAction),
            ...resultList.slice(3)
        ]);
    });

    it('should ignore action RETRIEVE_SUCCESS if no articleIndex', function () {
        const retrieveLinkAction = {
            type: RETRIEVE_SUCCESS,
            response: 'notice content'
        };
        assert.deepEqual(articleRecordList(resultList, retrieveLinkAction), resultList);
    });

    it('should ignore action RETRIEVE_SUCCESS if there is no article at state[articleIndex]', function () {
        const retrieveLinkAction = {
            type: RETRIEVE_SUCCESS,
            response: 'notice content',
            articleIndex: 3
        };
        assert.deepEqual(articleRecordList(resultList, retrieveLinkAction), resultList);
    });

    it('should pass action SHOW_NOTICE with an articleIndex to articleRecord', function () {
        const retrieveLinkAction = {
            type: SHOW_NOTICE,
            visibility: true,
            articleIndex: 2
        };
        assert.deepEqual(articleRecordList(resultList, retrieveLinkAction), [
            ...resultList.slice(0, 2),
            articleRecord(resultList[2], retrieveLinkAction),
            ...resultList.slice(3)
        ]);
    });

    it('should ignore action SHOW_NOTICE if  no articleIndex', function () {
        const retrieveLinkAction = {
            type: SHOW_NOTICE,
            visibility: true
        };
        assert.deepEqual(articleRecordList(resultList, retrieveLinkAction), resultList);
    });

    it('should ignore action SHOW_NOTICE if there is no article at state[articleIndex]', function () {
        const retrieveLinkAction = {
            type: SHOW_NOTICE,
            visibility: true,
            articleIndex: 3
        };
        assert.deepEqual(articleRecordList(resultList, retrieveLinkAction), resultList);
    });

    it('should ignore OTHER_ACTION_TYPE with articleIndex', function () {
        assert.deepEqual(articleRecordList(resultList, { type: 'OTHER_ACTION_TYPE', articleIndex: 2 }), resultList);
    });
});
