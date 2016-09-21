import { put, call, select } from 'redux-saga/effects';

import { exactMatchRetrieve } from '../../../lib/sagas/exactMatchRetrieve';
import fetch from '../../../lib/sagas/fetch';
import actions, {
    LOGOUT,
    SEARCH
} from '../../../lib/actions';
import * as fromState from '../../../lib/selectors';

describe('sagas exactMatchRetrieve', function () {
    let iterator;
    beforeEach(function () {
        iterator = exactMatchRetrieve();
    });

    it('should select getExactMatchNotice', function () {
        const next = iterator.next();

        assert.deepEqual(next.value, select(fromState.getExactMatchNotice));
    });

    it('should end if getExactMatchNotice return non null', function () {
        iterator.next();
        const next = iterator.next('notice');
        assert.isTrue(next.done);
    });

    it('should select getExactMatchRetrieveRequest and call fetch with it', function () {
        iterator.next();
        let next = iterator.next();
        assert.deepEqual(next.value, select(fromState.getExactMatchRetrieveRequest));
        next = iterator.next('request');
        assert.deepEqual(next.value, call(fetch, 'request', [LOGOUT, SEARCH]));
    });

    it('should end if fetch returned cancel', function () {
        iterator.next();
        iterator.next();
        iterator.next('request');
        const next = iterator.next({ cancel : true });
        assert.isTrue(next.done);
    });

    it('should put actions.exactMatchError if fetch returned an error', function () {
        iterator.next();
        iterator.next();
        iterator.next('request');
        const next = iterator.next({ error : 'Boom' });
        assert.deepEqual(next.value, put(actions.exactMatchRetrieveError('Boom')));
    });

    it('should put actions.exactMatchSuccess if fetch returned a response', function () {
        iterator.next();
        iterator.next();
        iterator.next('request');
        const next = iterator.next({ response : 'response' });
        assert.deepEqual(next.value, put(actions.exactMatchRetrieveSuccess('response')));
    });

});
