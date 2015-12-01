import { Map, List } from 'immutable';
import notice from '../../../lib/reducers/notice';
import { SHOW_NOTICE, RETRIEVE_SUCCESS, RETRIEVE_ERROR, RETRIEVE_PENDING } from '../../../lib/actions';

describe('reducers notice', function () {

    it ('should default state to empty object if none given', function () {
        assert.deepEqual(notice(undefined, Map({ type: 'OTHER_ACTION_TYPE' })), Map({status: 'NONE', data: List()}));
    });

    it ('should return object with shown property if action.type is SHOW_NOTICE and state is undefined', function () {
        assert.deepEqual(notice(undefined, { type: SHOW_NOTICE, visibility: true }).toJS(), { status: 'NONE', data: [], shown: true });
        assert.deepEqual(notice(undefined, { type: SHOW_NOTICE, visibility: false }).toJS(), { status: 'NONE', data: [], shown: false });
    });

    it ('should return state whith added shown property if action.type is SHOW_NOTICE', function () {
        const resultItem = Map({ name: 'notice', property: 'whatever' });
        assert.deepEqual(notice(resultItem, { type: SHOW_NOTICE, visibility: true }), resultItem.set('shown', true));
        assert.deepEqual(notice(resultItem, { type: SHOW_NOTICE, visibility: false }), resultItem.set('shown', false));
    });

    describe('when action.type is RETRIEVE_SUCCESS', function () {
        let noticeState;

        before(function () {
            const resultItem = Map({ name: 'notice', property: 'whatever', shown: false });
            noticeState = notice(resultItem, { type: RETRIEVE_SUCCESS, response: [1,2,3] });
        });

        it('should return state with data property set to action.response', function () {
            assert.deepEqual(noticeState.get('data'), List([1,2,3]));
        });

        it('should return state with shown set to true', function () {
            assert.equal(noticeState.get('shown'), true);
        });

        it('should return state with status set to SUCCESS', function () {
            assert.equal(noticeState.get('status'), 'SUCCESS');
        });

        it('should return state with empty error', function () {
            assert.equal(noticeState.get('error'), null);
        });
    });

    describe('when action.type is RETRIEVE_ERROR', function () {
        let noticeState;

        before(function () {
            const resultItem = Map({ name: 'notice', property: 'whatever', shown: true, data: List([1, 2, 3]) });
            noticeState = notice(resultItem, { type: RETRIEVE_ERROR, error: { message: 'boom' } });
        });

        it('should return state with empty data property', function () {
            assert.deepEqual(noticeState.get('data'), List());
        });

        it('should return state with shown set to false', function () {
            assert.equal(noticeState.get('shown'), false);
        });

        it('should return state with status set to ERROR', function () {
            assert.equal(noticeState.get('status'), 'ERROR');
        });

        it('should return state with error set to action.error.message', function () {
            assert.equal(noticeState.get('error'), 'boom');
        });
    });

    describe('when action.type is RETRIEVE_PENDING', function () {
        let noticeState;

        before(function () {
            const resultItem = Map({ name: 'notice', property: 'whatever', error: 'boom', shown: true, data: List([1, 2, 3]) });
            noticeState = notice(resultItem, { type: RETRIEVE_PENDING });
        });

        it('should return state with shown set to false', function () {
            assert.equal(noticeState.get('shown'), false);
        });

        it('should return state with status set to PENDING', function () {
            assert.equal(noticeState.get('status'), 'PENDING');
        });

        it('should return state with empty error', function () {
            assert.equal(noticeState.get('error'), null);
        });
    });

});
