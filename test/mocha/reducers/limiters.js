'use strict';

import { Map } from 'immutable';
import limiters from '../../../lib/reducers/limiters';
import { FULLTEXT_CHANGE, CHANGE_PUBLICATION_DATE, SHOW_LIMITER } from '../../../lib/actions';

describe('reducers limiters', function () {

    describe('default action', function () {

        it ('should default state to default limiter value', function () {
            assert.deepEqual(limiters(undefined, { type: 'OTHER_ACTION_TYPE' }), Map({
                limiterShown: false,
                fullText: true,
                publicationDate: Map({
                    from: '1000-01',
                    to: `${new Date().getFullYear() + 1}-01`
                })
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

    describe('FULLTEXT_CHANGE', function () {
        it('should set fulltext to action.fulltext', function () {
            assert.equal(limiters({ fullText: true }, { type: FULLTEXT_CHANGE, fullText: false }).get('fullText'), false);
        });
    });

    describe('CHANGE_PUBLICATION_DATE', function () {
        const newState = limiters({
            publicationDate: {
                from: '1000-01',
                to: '2016-01'
            }
        }, {
            type: CHANGE_PUBLICATION_DATE,
            from: '2000-01', to: '2012-05'
        }).toJS();
        assert.equal(newState.publicationDate.from, '2000-01');
        assert.equal(newState.publicationDate.to, '2012-05');
    });

});
