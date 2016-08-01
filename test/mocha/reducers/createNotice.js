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
                            {
                                name: 'name1',
                                value: [
                                    [
                                        {
                                            term: '"5271338"',
                                            field: 'KK',
                                            value: '5271338'
                                        },
                                        ': Christologie Soteriologie'
                                    ], [
                                        {
                                            term: '"527IV"',
                                            field: 'KK',
                                            value: '527IV'
                                        },
                                        ': CHRISTIANISME'
                                    ]
                                ]
                            },
                            { name: 'name2', value: ['value2'] },
                            { name: 'name3', value: [[ { indice: 1 }, 'value3']] },
                            { name: 'name4', value: [['value4', ['whatever']]] }
                        ]
                    }
                }, 1), {
                    name1: [
                        '5271338: Christologie Soteriologie',
                        '527IV: CHRISTIANISME'
                    ],
                    name2: ['value2'],
                    name3: ['value3'],
                    name4: ['value4']
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
                                    [{
                                        term: '\"BRETON, O.\"',
                                        field: 'AR',
                                        value: 'BRETON, O.'
                                    }, {
                                        indice: 'b1'
                                    }],
                                    ['John, Doe.']
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
                                value: [[
                                    '1234',
                                    [
                                        'additional info'
                                    ]
                                ]]
                            }
                        ]
                    }
                };
                assert.deepEqual(fromNotice.getAN(state, 1), ['AN  - 1234']);
            });
        });

        describe('getTI', function () {
            it('should return TI for notice with given id', function () {
                const state = {
                    byId: {
                        1: [
                            {
                                name: 'Title',
                                value: ['my title']
                            }
                        ]
                    }
                };
                assert.deepEqual(fromNotice.getTI(state, 1), ['TI  - my title']);
            });
        });

        describe('getTT', function () {
            it('should return TT for notice with given id', function () {
                const state = {
                    byId: {
                        1: [
                            {
                                name: 'TitleAlt',
                                value: ['mon titre (french)']
                            }
                        ]
                    }
                };
                assert.deepEqual(fromNotice.getTT(state, 1), ['TT  - mon titre (french)']);
            });

            it('should return empty array for notice with given id if no TitleAlt', function () {
                const state = {
                    byId: {
                        1: []
                    }
                };
                assert.deepEqual(fromNotice.getTT(state, 1), []);
            });
        });

        describe('getJA', function () {
            it.skip('should return JA for notice with given id', function () {
                const state = {
                    byId: {
                        1: [
                            {
                                name: 'TitleSource',
                                value: [
                                    [
                                        {
                                            term: '"Miscellanea francescana"',
                                            field: 'JN',
                                            value: 'Miscellanea francescana'
                                        },
                                        '[Misc. frances.], 2012, Vol. 112, Issue 3-4 p581-599, 19p'
                                    ]
                                ]
                            }
                        ]
                    }
                };
                assert.deepEqual(fromNotice.getJA(state, 1), ['JA  - Miscellanea francescana']);
            });
        });

        describe('getJO', function () {
            it('should return JO for notice with given id', function () {
                const state = {
                    byId: {
                        1: [
                            {
                                name: 'PublisherInfo',
                                value: [['Miscellanea Francescana, Roma; 2012 Country of publication: Italy']]
                            }
                        ]
                    }
                };
                assert.deepEqual(fromNotice.getJO(state, 1), ['JO  - Miscellanea Francescana, Roma; 2012 Country of publication: Italy']);
            });
        });

        describe('getJF', function () {
            it('should return JF for notice with given id', function () {
                const state = {
                    byId: {
                        1: [
                            {
                                name: 'PublisherInfo',
                                value: [['Miscellanea Francescana, Roma; 2012 Country of publication: Italy']]
                            }
                        ]
                    }
                };
                assert.deepEqual(fromNotice.getJF(state, 1), ['JF  - Miscellanea Francescana, Roma; 2012 Country of publication: Italy']);
            });
        });
    });
});
