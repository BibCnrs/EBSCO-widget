import { Map } from 'immutable';
import limiters from '../../../lib/reducers/limiters';
import { CHANGE_LIMITER, SHOW_LIMITER, LIMIT_SEARCH, RESET_LIMITER } from '../../../lib/actions';

describe('reducers limiters', function () {

    describe('default action', function () {

        it ('should default state to default limiter value', function () {
            assert.deepEqual(limiters(undefined, { type: 'OTHER_ACTION_TYPE' }), Map({
                limiterShown: true,
                moreShown: false,
                hasChanged: false,
                fullText: true,
                publicationDate: Map({
                    from: '1000-01',
                    to: `${new Date().getFullYear() + 1}-01`
                }),
                peerReviewed: false,
                author: null,
                journalName: null,
                title: null,
                language: null
            }));
        });

        it ('should return state unchanged if one was passed', function () {
            assert.deepEqual(limiters({ state: 'state'}, { type: 'OTHER_ACTION_TYPE' }), Map({
                state: 'state'
            }));
        });
    });

    describe('SHOW_LIMITER', function () {
        it('should set limiterShown to true if action.visibility is true', function () {
            assert.equal(limiters({ limiterShown: false }, { type: SHOW_LIMITER, visibility: true }).get('limiterShown'), true);
        });

        it('should set limiterShown to false if action.visibility is false', function () {
            assert.equal(limiters({ limiterShown: true }, { type: SHOW_LIMITER, visibility: false }).get('limiterShown'), false);
        });
    });

    describe('CHANGE_LIMITER', function () {
        it('should set action.limiter to action.value', function () {
            assert.equal(limiters({ fullText: true }, { type: CHANGE_LIMITER, limiter: 'fullText', value: false }).get('fullText'), false);
            const newState = limiters({
                publicationDate: {
                    from: '1000-01',
                    to: '2016-01'
                }
            }, {
                type: CHANGE_LIMITER,
                limiter: 'publicationDate',
                value: { from: '2000-01', to: '2012-05' }
            }).toJS();
            assert.equal(newState.publicationDate.from, '2000-01');
            assert.equal(newState.publicationDate.to, '2012-05');
        });
    });

    describe('LIMIT_SEARCH', function() {
        it('should set hasChanged to false', function () {
            assert.equal(limiters({ hasChanged: true }, { type: LIMIT_SEARCH }).get('hasChanged'), false);
        });
    });

    describe('RESET_LIMITER', function() {
        it('should return default state except for limiterShown and moreShown', function () {
            assert.deepEqual(limiters({
                publicationDate: {
                    from: '1000-01',
                    to: '2016-01'
                },
                author: 'Asimov',
                limiterShown: true,
                moreShown: true
            }, { type: RESET_LIMITER }).toJS(), {
                limiterShown: true,
                moreShown: true,
                hasChanged: false,
                fullText: true,
                publicationDate: {
                    from: '1000-01',
                    to: `${new Date().getFullYear() + 1}-01`
                },
                peerReviewed: false,
                author: null,
                journalName: null,
                title: null,
                language: null
            });
        });

        it('should let moreShown value unchanged', function () {
            assert.equal(limiters({ moreShown: true }, { type: RESET_LIMITER }).get('moreShown'), true);
            assert.equal(limiters({ moreShown: false }, { type: RESET_LIMITER }).get('moreShown'), false);
        });
    });

});
