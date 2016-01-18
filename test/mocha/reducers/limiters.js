import limiters from '../../../lib/reducers/limiters';
import {
    CHANGE_LIMITER,
    RESET,
    LOGOUT
} from '../../../lib/actions';

describe('reducers limiters', function () {

    describe('default action', function () {

        it ('should default state to default limiter value', function () {
            assert.deepEqual(limiters(undefined, { type: 'OTHER_ACTION_TYPE' }), {
                fullText: true,
                publicationDate: {
                    from: 1000,
                    to: new Date().getFullYear() + 1
                },
                peerReviewed: false,
                author: null,
                journalName: null,
                title: null,
                language: []
            });
        });

        it ('should return default state if action type is LOGOUT', function () {
            assert.deepEqual(
                limiters(
                    {
                        fullText: false,
                        publicationDate: {
                            from: 2000,
                            to: 2015
                        },
                        peerReviewed: true,
                        author: 'Aasimov',
                        journalName: 'science',
                        title: 'robotic law',
                        language: ['english']
                    },
                    { type: LOGOUT }
                ),
                {
                    fullText: true,
                    publicationDate: {
                        from: 1000,
                        to: new Date().getFullYear() + 1
                    },
                    peerReviewed: false,
                    author: null,
                    journalName: null,
                    title: null,
                    language: []
                });
        });

        it ('should return state unchanged if one was passed', function () {
            assert.deepEqual(limiters({ state: 'state'}, { type: 'OTHER_ACTION_TYPE' }), {
                state: 'state'
            });
        });
    });

    describe('CHANGE_LIMITER', function () {
        it('should set action.limiter to action.value', function () {
            assert.equal(limiters({ fullText: true }, { type: CHANGE_LIMITER, limiter: 'fullText', value: false }).fullText, false);
            const newState = limiters({
                publicationDate: {
                    from: 1000,
                    to: 2016
                }
            }, {
                type: CHANGE_LIMITER,
                limiter: 'publicationDate',
                value: { from: 2000, to: 2012 }
            });
            assert.equal(newState.publicationDate.from, 2000);
            assert.equal(newState.publicationDate.to, 2012);
        });
    });

    describe('RESET', function () {

        it ('should return all value to default except for fullText', function () {
            assert.deepEqual(limiters({
                fullText: false,
                publicationDate: {
                    from: 2010,
                    to: 2012
                },
                peerReviewed: true,
                author: 'author',
                journalName: 'the journal',
                title: 'a title',
                language: ['javanese']
            }, { type: RESET }), {
                fullText: false,
                publicationDate: {
                    from: 1000,
                    to: new Date().getFullYear() + 1
                },
                peerReviewed: false,
                author: null,
                journalName: null,
                title: null,
                language: []
            });
        });
    });

});
