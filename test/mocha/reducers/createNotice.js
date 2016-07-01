import createNotice, * as fromNotice from '../../../lib/reducers/createNotice';

import {
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

        describe('getMissingNoticeIds', function () {
            it('should return only the id that are not in byId', function () {
                assert.deepEqual(fromNotice.getMissingNoticeIds({
                    byId: {
                        1: 'notice'
                    }
                }, ['1', '2']), ['2']);
            });
        });

        describe('getNoticeLiteralById', function () {
            it('should return notice in literal form', function () {
                assert.deepEqual(fromNotice.getNoticeLiteralById({
                    byId: {
                        1: [
                            { name: 'name1', value: 'value1' },
                            { name: 'name2', value: 'value2' },
                            { name: 'name3', value: 'value3' }
                        ]
                    }
                }, 1), {
                    name1: 'value1',
                    name2: 'value2',
                    name3: 'value3'
                });
            });
        });

        describe('getAU', function () {
            it('should return list of AU for every author in notice', function () {
                const state = {
                    byId: {
                        1: [
                            {
                                name: 'Author',
                                value: [
                                    {
                                        term: '\"BRETON, O.\"',
                                        field: 'AR',
                                        value: 'BRETON, O.'
                                    }, {
                                        indice: 'b1'
                                    },
                                    'John, Doe.'
                                ]
                            }
                        ]
                    }
                };
                assert.deepEqual(fromNotice.getAU(state, 1), [
                    'AU  - BRETON, O.',
                    'AU  - John, Doe.'
                ]);
            });
        });

        describe('getAN', function () {
            it('should return AN for notice with given id', function () {
                const state = {
                    byId: {
                        1: [
                            {
                                name: 'AN',
                                value: [
                                    '1234',
                                    [
                                        'additional info'
                                    ]
                                ]
                            }
                        ]
                    }
                };
                assert.deepEqual(fromNotice.getAN(state, 1), [
                    'AN  - 1234'
                ]);
            });
        });
    });
});
