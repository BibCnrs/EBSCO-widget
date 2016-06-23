import createNotice, * as fromNotice from '../../../lib/reducers/createNotice';

import {
    RETRIEVE_SUCCESS,
    SHOW_NOTICE
} from '../../../lib/actions';

describe('createNotice', function () {
    let categoryNotice;

    before(function () {
        categoryNotice = createNotice('category');
    });

    it('should return default state if called with no state and any action', function () {
        assert.deepEqual(categoryNotice(undefined, {}), fromNotice.defaultState);
    });

    it('should set action.id to action.response if action is RETRIEVE_SUCCESS', function () {
        assert.deepEqual(categoryNotice({ other: 'value'}, { type: RETRIEVE_SUCCESS, category: 'category', id: 64, response: { api: 'response' } }), {
            other: 'value',
            byId: {
                64: { api: 'response' }
            }
        });
    });

    it('should not set action.id to action.response if action is RETRIEVE_SUCCESS but category does not match', function () {
        assert.deepEqual(categoryNotice({ other: 'value'}, { type: RETRIEVE_SUCCESS, category: 'other category', id: 64, response: { api: 'response' } }), {
            other: 'value'
        });
    });

    it('should add action.id to noticeShown if action is SHOW_NOTICE', function () {
        assert.deepEqual(categoryNotice({ other: 'value', noticeShown: [1, 2] }, { type: SHOW_NOTICE, category: 'category', id: 64 }), {
            other: 'value',
            noticeShown: [1, 2, 64]
        });
    });

    it('should remove action.id from noticeShown if it is in it and action is SHOW_NOTICE', function () {
        assert.deepEqual(categoryNotice({ other: 'value', noticeShown: [1, 64, 2] }, { type: SHOW_NOTICE, category: 'category', id: 64 }), {
            other: 'value',
            noticeShown: [1, 2]
        });
    });

    it('should not change state if action is SHOW_NOTICE but category does not match', function () {
        assert.deepEqual(categoryNotice({ other: 'value'}, { type: SHOW_NOTICE, category: 'other category', id: 64 }), {
            other: 'value'
        });
    });

    describe('selector', function () {
        describe('isNoticeShown', function () {
            it('should return true if given id is in noticeShown', function () {
                assert.isTrue(fromNotice.isNoticeShown({ noticeShown: [1, 64, 2]}, 64));
            });

            it('should return false if given id is not in noticeShown', function () {
                assert.isFalse(fromNotice.isNoticeShown({ noticeShown: [1, 2]}, 64));
            });

            it('should return false if there is no noticeShown', function () {
                assert.isFalse(fromNotice.isNoticeShown({}, 64));
            });
        });

        describe('getNoticeById', function () {
            it('should return notice for given id', function () {
                assert.equal(fromNotice.getNoticeById({ byId: {
                    1: 'notice 1',
                    64: 'notice 64'
                }}, 64), 'notice 64');
            });

            it('should return undefined if given id is not in byId', function () {
                assert.isUndefined(fromNotice.getNoticeById({ byId: { 1: 'notice 1' }}, 64));
            });

            it('should return false if there is no noticeShown', function () {
                assert.isUndefined(fromNotice.getNoticeById({}, 64));
            });
        });
    });
});
