import {
    LOGOUT,
    SEARCH,
    EXACT_MATCH_SUCCESS,
    EXACT_MATCH_RETRIEVE_SUCCESS,
    SHOW_EXACT_MATCH_NOTICE,
    EXACT_MATCH_SEARCH
} from '../../../lib/actions';
import exactMatch, * as fromState from '../../../lib/reducers/exactMatch';

describe('reducer exactMatch', function () {
    describe('actions', function () {
        describe('LOGOUT', function () {
            it('should return defaultState', function () {
                assert.deepEqual(
                    exactMatch({ some: 'state' }, { type: LOGOUT }),
                    fromState.defaultState
                );
            });
        });

        describe('SEARCH', function () {
            it('should return defaultState', function () {
                assert.deepEqual(
                    exactMatch({ some: 'state' }, { type: SEARCH }),
                    fromState.defaultState
                );
            });
        });

        describe('EXACT_MATCH_SEARCH', function () {
            it('should return defaultState', function () {
                assert.deepEqual(
                    exactMatch({ some: 'state' }, { type: EXACT_MATCH_SEARCH }),
                    fromState.defaultState
                );
            });
        });

        describe('EXACT_MATCH_SUCCESS', function () {
            it('should set publication to action.response.results[0]', function () {
                assert.deepEqual(
                    exactMatch({ some: 'state' }, { type: EXACT_MATCH_SUCCESS, response: { results: ['publication']} }),
                    {
                        some: 'state',
                        publication: 'publication'
                    }
                );
            });
        });

        describe('EXACT_MATCH_RETRIEVE_SUCCESS', function () {
            it('should set publication to action.response.results[0]', function () {
                assert.deepEqual(
                    exactMatch({ some: 'state' }, { type: EXACT_MATCH_RETRIEVE_SUCCESS, response: 'response' }),
                    {
                        some: 'state',
                        notice: 'response'
                    }
                );
            });
        });

        describe('SHOW_EXACT_MATCH_NOTICE', function () {
            it('should set noticeShown to true', function () {
                assert.deepEqual(
                    exactMatch({ some: 'state' }, { type: SHOW_EXACT_MATCH_NOTICE }),
                    {
                        some: 'state',
                        noticeShown: true
                    }
                );
            });

            it('should set noticeShown to false if it was true', function () {
                assert.deepEqual(
                    exactMatch({ some: 'state', noticeShown: true }, { type: SHOW_EXACT_MATCH_NOTICE }),
                    {
                        some: 'state',
                        noticeShown: false
                    }
                );
            });
        });
    });

    describe('fromState', function() {
        describe('getExactMatchNotice', function () {
            it('should return notice formatted as a literal ignoring first item and adding publication.fullTextHoldings', function () {
                const state = {
                    notice: {
                        items: [
                            { name: 'ignored name', value: 'ignored value' },
                            { name: 'name', value: 'value' }
                        ]
                    },
                    publication: {
                        fullTextHoldings: 'fullTextHoldings'
                    }
                };
                assert.deepEqual(
                    fromState.getExactMatchNotice(state),
                    {
                        name: 'value',
                        fullTextHoldings: 'fullTextHoldings'
                    }
                );
            });
            it('should default fullTextHoldings to undefined', function () {
                const state = {
                    notice: {
                        items: [
                            { name: 'ignored name', value: 'ignored value' },
                            { name: 'name', value: 'value' }
                        ]
                    }
                };
                assert.deepEqual(
                    fromState.getExactMatchNotice(state),
                    {
                        name: 'value',
                        fullTextHoldings: undefined
                    }
                );
            });

            it('should return null if no notice', function () {
                const state = {
                    publication: {
                        fullTextHoldings: 'fullTextHoldings'
                    }
                };
                assert.isNull(fromState.getExactMatchNotice(state));
            });
        });
    });

});
