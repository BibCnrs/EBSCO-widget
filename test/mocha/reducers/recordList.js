import recordList from '../../../lib/reducers/recordList';
import {
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    SEARCH_PENDING
} from '../../../lib/actions';

describe('reducers recordList', function () {
    const resultList = [
        { name: 'result1', notice: {} },
        { name: 'result2', notice: {} },
        { name: 'result3', notice: {} }
    ];

    it ('should default state to empty arrray if none given', function () {
        assert.deepEqual(recordList(undefined, { type: 'OTHER_ACTION_TYPE' }), []);
    });

    it ('should return default state if action type is LOGOUT', function () {
        assert.deepEqual(recordList([ 'result1', 'result2' ], { type: 'LOGOUT' }), []);
    });

    it ('should return given state if not concernerd by ACTION', function () {
        assert.deepEqual(recordList(resultList, { type: 'OTHER_ACTION_TYPE' }), resultList);
    });

    it ('should return action.reponse if action type is SEARCH_SUCCESS', function () {
        assert.deepEqual(recordList(undefined, { type: SEARCH_SUCCESS, response: { results: resultList } }), resultList);
    });

    it ('should return empty array if action type is SEARCH_ERROR', function () {
        assert.deepEqual(recordList(resultList, { type: SEARCH_ERROR, error: 'error' }), []);
    });

    it ('should return empty array if action type is SEARCH_PENDING', function () {
        assert.deepEqual(recordList(resultList, { type: SEARCH_PENDING }), []);
    });

});
