import { put, call, select } from 'redux-saga/effects';

import { exactMatch } from '../../../lib/sagas/exactMatch';
import fetch from '../../../lib/sagas/fetch';
import actions, {
    LOGOUT,
    RETRIEVE
} from '../../../lib/actions';
import * as fromState from '../../../lib/selectors';

describe('sagas exactMatch', function () {
    let iterator;
    let action = {
        category: 'article'
    };
    beforeEach(function () {
        iterator = exactMatch(action);
    });

    it('should return if action.category is not "article"', function () {
        iterator = exactMatch({ category: 'not article'});
        const next = iterator.next();
        assert.isTrue(next.done);
    });

    it('should select canUserSearch', function () {
        const next = iterator.next();

        assert.deepEqual(next.value, select(fromState.canUserSearch));
    });

    it('should end if canUserSearch return false', function () {
        iterator.next();
        const next = iterator.next(false);

        assert.isTrue(next.done);
    });

    it('should select canExactMatch', function () {
        iterator.next();
        const next = iterator.next(true);

        assert.deepEqual(next.value, select(fromState.canExactMatch));
    });

    it('should end if canExactMatch return false', function () {
        iterator.next();
        iterator.next(true);
        const next = iterator.next(false);

        assert.isTrue(next.done);
    });

    it('should select getExactMatchRequest and call fetch with it', function () {
        iterator.next();
        iterator.next(true);
        let next = iterator.next(true);
        assert.deepEqual(next.value, select(fromState.getExactMatchRequest));
        next = iterator.next('request');
        assert.deepEqual(next.value, call(fetch, 'request', [LOGOUT, RETRIEVE]));

    });

    it('should end if fetch returned cancel', function () {
        iterator.next();
        iterator.next(true);
        iterator.next(true);
        iterator.next('request');
        const next = iterator.next({ cancel : true });
        assert.isTrue(next.done);
    });

    it('should put actions.exactMatchError if fetch returned an error', function () {
        iterator.next();
        iterator.next(true);
        iterator.next(true);
        iterator.next('request');
        const next = iterator.next({ error : 'Boom' });
        assert.deepEqual(next.value, put(actions.exactMatchError('Boom')));
    });

    it('should put actions.exactMatchSuccess if fetch returned a response', function () {
        iterator.next();
        iterator.next(true);
        iterator.next(true);
        iterator.next('request');
        const next = iterator.next({ response : 'response' });
        assert.deepEqual(next.value, put(actions.exactMatchSuccess('response')));
    });

});
