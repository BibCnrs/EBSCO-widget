import { put, select, call } from 'redux-saga/effects';

import { handleAddFavouriteResources } from '../../../lib/sagas/updateFavouriteResources';
import actions from '../../../lib/actions';
import * as fromState from '../../../lib/selectors';
import fetch from '../../../lib/sagas/fetch';
import { delay } from '../../../lib/services/sagaUtils';

describe('updateFavouriteResources sagas', () => {
    it('should updateFavouriteResources and animate profile', () => {
        const it = handleAddFavouriteResources();
        assert.deepEqual(it.next(), {
            done: false,
            value: select(fromState.getApiUpdateFavoriteResourcesRequest),
        });

        assert.deepEqual(it.next('request'), {
            done: false,
            value: call(fetch, 'request'),
        });
        assert.deepEqual(it.next({}), {
            done: false,
            value: put(actions.startAnimateProfile()),
        });
        assert.deepEqual(it.next(), {
            done: false,
            value: delay(1000),
        });
        assert.deepEqual(it.next(), {
            done: false,
            value: put(actions.stopAnimateProfile()),
        });
        assert.deepEqual(it.next(), {
            done: true,
            value: undefined,
        });
    });

    it('should put FETCH_ERROR if update request errored', () => {
        const it = handleAddFavouriteResources();
        assert.deepEqual(it.next(), {
            done: false,
            value: select(fromState.getApiUpdateFavoriteResourcesRequest),
        });

        assert.deepEqual(it.next('request'), {
            done: false,
            value: call(fetch, 'request'),
        });
        assert.deepEqual(it.next({ error: 'Boom' }), {
            done: false,
            value: put(actions.fetchError('Boom')),
        });
        assert.deepEqual(it.next(), {
            done: true,
            value: undefined,
        });
    });
});
