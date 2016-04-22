import a2zRecordList from '../../../lib/reducers/a2zRecordList';
import {
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    SEARCH_PENDING
} from '../../../lib/actions/a2z';

describe('reducers a2zRecordList', function () {
    const resultList = [
        { name: 'result1', notice: {} },
        { name: 'result2', notice: {} },
        { name: 'result3', notice: {} }
    ];

    it ('should default state to empty arrray if none given', function () {
        assert.deepEqual(a2zRecordList(undefined, { type: 'OTHER_ACTION_TYPE' }), []);
    });

    it('should not add a result when action action point to an empty index', function () {
        const state = [ 'first' ];
        assert.deepEqual(
            a2zRecordList(state, {
                type: 'WHATEVER',
                index: 1
            }),
            state
        );
    });

    it ('should return given state if not concernerd by ACTION', function () {
        assert.deepEqual(a2zRecordList(resultList, { type: 'OTHER_ACTION_TYPE' }), resultList);
    });

    it ('should return action.reponse if action type is SEARCH_SUCCESS', function () {
        assert.deepEqual(a2zRecordList(undefined, { type: SEARCH_SUCCESS, response: { results: resultList } }), resultList);
    });

    it ('should return empty array if action type is SEARCH_ERROR', function () {
        assert.deepEqual(a2zRecordList(resultList, { type: SEARCH_ERROR, error: 'error' }), []);
    });

    it ('should return empty array if action type is SEARCH_PENDING', function () {
        assert.deepEqual(a2zRecordList(resultList, { type: SEARCH_PENDING }), []);
    });

});
