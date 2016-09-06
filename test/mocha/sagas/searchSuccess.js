import { call } from 'redux-saga/effects';

import { searchSuccess, getMissingLinkIds } from '../../../lib/sagas/searchSuccess';
import retrieve from '../../../lib/sagas/retrieve';

describe('sagas searchSuccess', function () {
    let iterator;
    let action = {
        id: '7',
        category: 'article',
        response: 'response data'
    };

    beforeEach(function () {
        iterator = searchSuccess(action);
    });

    it('should call getMissingLinkIds with action.response', function () {
        let next = iterator.next();
        assert.deepEqual(next.value, call(getMissingLinkIds, action.response));
    });

    it('should call retrieve forEach returned id', function () {
        iterator.next();
        let next = iterator.next([1, 2, 3]);
        assert.deepEqual(next.value, [
            call(retrieve, 1, 'article'),
            call(retrieve, 2, 'article'),
            call(retrieve, 3, 'article')
        ]);
    });

});
