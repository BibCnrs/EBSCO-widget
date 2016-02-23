import articleRecordList from '../../../lib/reducers/articleRecordList';
import {
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    SEARCH_PENDING
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

});
