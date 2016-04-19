import publicationRecordList from '../../../lib/reducers/publicationRecordList';
import publicationRecord from '../../../lib/reducers/publicationRecord';

import {
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    SEARCH_PENDING,
    RETRIEVE_SUCCESS,
    SHOW_NOTICE
} from '../../../lib/actions/publication';

describe('reducers publicationRecordList', function () {
    const resultList = [
        { name: 'result1', notice: {} },
        { name: 'result2', notice: {} },
        { name: 'result3', notice: {} }
    ];

    it ('should default state to empty arrray if none given', function () {
        assert.deepEqual(publicationRecordList(undefined, { type: 'OTHER_ACTION_TYPE' }), []);
    });

    it('should not add a result when action action point to an empty index', function () {
        const state = [ 'first' ];
        assert.deepEqual(
            publicationRecordList(state, {
                type: 'WHATEVER',
                index: 1
            }),
            state
        );
    });

    it ('should return default state if action type is LOGOUT', function () {
        assert.deepEqual(publicationRecordList([ 'result1', 'result2' ], { type: 'LOGOUT' }), []);
    });

    it ('should return given state if not concernerd by ACTION', function () {
        assert.deepEqual(publicationRecordList(resultList, { type: 'OTHER_ACTION_TYPE' }), resultList);
    });

    it ('should return action.reponse if action type is SEARCH_SUCCESS', function () {
        assert.deepEqual(publicationRecordList(undefined, { type: SEARCH_SUCCESS, response: { results: resultList } }), resultList);
    });

    it ('should return empty array if action type is SEARCH_ERROR', function () {
        assert.deepEqual(publicationRecordList(resultList, { type: SEARCH_ERROR, error: 'error' }), []);
    });

    it ('should return empty array if action type is SEARCH_PENDING', function () {
        assert.deepEqual(publicationRecordList(resultList, { type: SEARCH_PENDING }), []);
    });

    it('should pass action RETRIEVE_SUCCESS with an publicationIndex to publicationRecord', function () {
        const retrieveLinkAction = {
            type: RETRIEVE_SUCCESS,
            response: 'notice content',
            publicationIndex: 2
        };
        assert.deepEqual(publicationRecordList(resultList, retrieveLinkAction), [
            ...resultList.slice(0, 2),
            publicationRecord(resultList[2], retrieveLinkAction),
            ...resultList.slice(3)
        ]);
    });

    it('should ignore action RETRIEVE_SUCCESS if no publicationIndex', function () {
        const retrieveLinkAction = {
            type: RETRIEVE_SUCCESS,
            response: 'notice content'
        };
        assert.deepEqual(publicationRecordList(resultList, retrieveLinkAction), resultList);
    });

    it('should ignore action RETRIEVE_SUCCESS if there is no publication at state[publicationIndex]', function () {
        const retrieveLinkAction = {
            type: RETRIEVE_SUCCESS,
            response: 'notice content',
            publicationIndex: 3
        };
        assert.deepEqual(publicationRecordList(resultList, retrieveLinkAction), resultList);
    });

    it('should pass action SHOW_NOTICE with an publicationIndex to publicationRecord', function () {
        const retrieveLinkAction = {
            type: SHOW_NOTICE,
            visibility: true,
            publicationIndex: 2
        };
        assert.deepEqual(publicationRecordList(resultList, retrieveLinkAction), [
            ...resultList.slice(0, 2),
            publicationRecord(resultList[2], retrieveLinkAction),
            ...resultList.slice(3)
        ]);
    });

    it('should ignore action SHOW_NOTICE if  no publicationIndex', function () {
        const retrieveLinkAction = {
            type: SHOW_NOTICE,
            visibility: true
        };
        assert.deepEqual(publicationRecordList(resultList, retrieveLinkAction), resultList);
    });

    it('should ignore action SHOW_NOTICE if there is no publication at state[publicationIndex]', function () {
        const retrieveLinkAction = {
            type: SHOW_NOTICE,
            visibility: true,
            publicationIndex: 3
        };
        assert.deepEqual(publicationRecordList(resultList, retrieveLinkAction), resultList);
    });

    it('should ignore OTHER_ACTION_TYPE with publicationIndex', function () {
        assert.deepEqual(publicationRecordList(resultList, { type: 'OTHER_ACTION_TYPE', publicationIndex: 2 }), resultList);
    });
});
