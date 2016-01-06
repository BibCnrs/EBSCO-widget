import notice from '../../../lib/reducers/notice';
import { SHOW_NOTICE, RETRIEVE_SUCCESS, RETRIEVE_ERROR, RETRIEVE_PENDING } from '../../../lib/actions';

describe('reducers notice', function () {

    it ('should default state to empty object if none given', function () {
        assert.deepEqual(notice(undefined, { type: 'OTHER_ACTION_TYPE' }), {status: 'NONE', data: []});
    });

    it ('should return object with shown property if action.type is SHOW_NOTICE and state is undefined', function () {
        assert.deepEqual(
            notice(undefined, { type: SHOW_NOTICE, visibility: true }),
            { status: 'NONE', data: [], shown: true }
        );
        assert.deepEqual(
            notice(undefined, { type: SHOW_NOTICE, visibility: false }),
            { status: 'NONE', data: [], shown: false }
        );
    });

    it ('should return state whith added shown property if action.type is SHOW_NOTICE', function () {
        const resultItem = { name: 'notice', property: 'whatever' };
        assert.deepEqual(
            notice(resultItem, { type: SHOW_NOTICE, visibility: true }),
            { ...resultItem, shown: true }
        );
        assert.deepEqual(
            notice(resultItem, { type: SHOW_NOTICE, visibility: false }),
            { ...resultItem, shown: false }
        );
    });

    describe('when action.type is RETRIEVE_SUCCESS', function () {
        let noticeState;

        before(function () {
            const resultItem = { name: 'notice', property: 'whatever', shown: false };
            noticeState = notice(resultItem, { type: RETRIEVE_SUCCESS, response: [1,2,3] });
        });

        it('should return state with data property set to action.response', function () {
            assert.deepEqual(noticeState.data, [1,2,3]);
        });

        it('should return state with shown set to true', function () {
            assert.equal(noticeState.shown, true);
        });

        it('should return state with status set to SUCCESS', function () {
            assert.equal(noticeState.status, 'SUCCESS');
        });

        it('should return state with empty error', function () {
            assert.equal(noticeState.error, null);
        });
    });

    describe('when action.type is RETRIEVE_ERROR', function () {
        let noticeState;

        before(function () {
            const resultItem = {
                name: 'notice',
                property: 'whatever',
                shown: true,
                data: [1, 2, 3]
            };
            noticeState = notice(resultItem, { type: RETRIEVE_ERROR, error: { message: 'boom' } });
        });

        it('should return state with empty data property', function () {
            assert.deepEqual(noticeState.data, []);
        });

        it('should return state with shown set to false', function () {
            assert.equal(noticeState.shown, false);
        });

        it('should return state with status set to ERROR', function () {
            assert.equal(noticeState.status, 'ERROR');
        });

        it('should return state with error set to action.error.message', function () {
            assert.equal(noticeState.error, 'boom');
        });
    });

    describe('when action.type is RETRIEVE_PENDING', function () {
        let noticeState;

        before(function () {
            const resultItem = {
                name: 'notice',
                property: 'whatever',
                error: 'boom',
                shown: true,
                data: [1, 2, 3]
            };
            noticeState = notice(resultItem, { type: RETRIEVE_PENDING });
        });

        it('should return state with shown set to false', function () {
            assert.equal(noticeState.shown, false);
        });

        it('should return state with status set to PENDING', function () {
            assert.equal(noticeState.status, 'PENDING');
        });

        it('should return state with empty error', function () {
            assert.equal(noticeState.error, null);
        });
    });

});
