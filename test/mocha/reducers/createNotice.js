import createNotice, * as fromNotice from '../../../lib/reducers/createNotice';

import {
    INITIALIZE,
    RETRIEVE_SUCCESS,
    SHOW_NOTICE
} from '../../../lib/actions';

describe('createNotice', function () {

    describe('actions', function () {

        let categoryNotice;

        before(function () {
            categoryNotice = createNotice('category');
        });

        it('should return default state if called with no state and any action', function () {
            assert.deepEqual(categoryNotice(undefined, {}), fromNotice.defaultState);
        });

        describe('INITIALIZE', function () {
            it('should return received state if all noticeShown are found in byId', function () {
                const state = {
                    noticeShown: [1, 2],
                    byId: {
                        1: 'notice1',
                        2: 'notice2'
                    }
                };
                assert.deepEqual(categoryNotice(state, { type: INITIALIZE }), state);
            });

            it('should remove all noticeShown that are not in byId', function () {
                const state = {
                    noticeShown: [1, 2, 3, 4],
                    byId: {
                        2: 'notice2',
                        4: 'notice4',
                        5: 'notice5'
                    }
                };
                assert.deepEqual(categoryNotice(state, { type: INITIALIZE }), {
                    ...state,
                    noticeShown: [2, 4]
                });
            });
        });

        describe('RETRIEVE_SUCCESS', function () {

            it('should set action.id to action.response', function () {
                assert.deepEqual(categoryNotice({ other: 'value'}, { type: RETRIEVE_SUCCESS, category: 'category', id: 64, response: { api: 'response' } }), {
                    other: 'value',
                    byId: {
                        64: { api: 'response' }
                    }
                });
            });

            it('should not set action.id to action.response if category does not match', function () {
                assert.deepEqual(categoryNotice({ other: 'value'}, { type: RETRIEVE_SUCCESS, category: 'other category', id: 64, response: { api: 'response' } }), {
                    other: 'value'
                });
            });
        });

        describe('SHOW_NOTICE', function () {

            it('should add action.id to noticeShown', function () {
                assert.deepEqual(categoryNotice({ other: 'value', noticeShown: [1, 2] }, { type: SHOW_NOTICE, category: 'category', id: 64 }), {
                    other: 'value',
                    noticeShown: [1, 2, 64]
                });
            });

            it('should remove action.id from noticeShown if it is in it', function () {
                assert.deepEqual(categoryNotice({ other: 'value', noticeShown: [1, 64, 2] }, { type: SHOW_NOTICE, category: 'category', id: 64 }), {
                    other: 'value',
                    noticeShown: [1, 2]
                });
            });

            it('should not change state if category does not match', function () {
                assert.deepEqual(categoryNotice({ other: 'value'}, { type: SHOW_NOTICE, category: 'other category', id: 64 }), {
                    other: 'value'
                });
            });
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
            it('should return notice.items formatted as literal minus the first item for given id', function () {
                assert.deepEqual(fromNotice.getNoticeById({ byId: {
                    1: 'notice 1',
                    64: {
                        items: [
                            { name: 'key1', value: 'value1' },
                            { name: 'key2', value: 'value2' },
                            { name: 'key3', value: 'value3' }
                        ]
                    }
                }}, 64), {
                    key2: 'value2',
                    key3: 'value3'
                });
            });

            it('should add dbId with dbLabel if both are provided', function () {
                assert.deepEqual(fromNotice.getNoticeById({ byId: {
                    1: 'notice 1',
                    64: {
                        dbId: 'dbId',
                        dbLabel: 'dbLabel',
                        items: []
                    }
                }}, 64), {
                    dbLabel: 'dbId'
                });
            });

            it('should add dbId with with key if there is only a dbId', function () {
                assert.deepEqual(fromNotice.getNoticeById({ byId: {
                    1: 'notice 1',
                    64: {
                        dbId: 'dbId',
                        items: []
                    }
                }}, 64), {
                    'dbId': 'dbId'
                });
            });

            it('should add articleLinks.fullTextLinks if it is present', function () {
                assert.deepEqual(fromNotice.getNoticeById({ byId: {
                    1: 'notice 1',
                    64: {
                        articleLinks: {
                            fullTextLinks: 'value'
                        },
                        items: []
                    }
                }}, 64), {
                    'fullTextLinks': 'value'
                });
            });

            it('should add articleLinks.pdfLinks if it is present', function () {
                assert.deepEqual(fromNotice.getNoticeById({ byId: {
                    1: 'notice 1',
                    64: {
                        articleLinks: {
                            pdfLinks: 'value'
                        },
                        items: []
                    }
                }}, 64), {
                    'pdfLinks': 'value'
                });
            });

            it('should return undefined if given id is not in byId', function () {
                assert.isUndefined(fromNotice.getNoticeById({ byId: { 1: 'notice 1' }}, 64));
            });
        });
    });
});
