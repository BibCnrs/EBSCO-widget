import createLimiters, { defaultState } from '../../../lib/reducers/createLimiters';
import {
    CHANGE_LIMITER,
    LINKED_SEARCH,
    LOGOUT
} from '../../../lib/actions';

describe('reducers createLimiters', function () {
    let categoryLimiters;

    before(function () {
        categoryLimiters = createLimiters('category');
    });

    describe('default action', function () {

        it ('should default state to default limiter value', function () {
            assert.deepEqual(createLimiters('article')(undefined, {
                type: 'OTHER_ACTION_TYPE',
                category: 'category'
            }), defaultState['article']);

            assert.deepEqual(createLimiters('publication')(undefined, {
                type: 'OTHER_ACTION_TYPE',
                category: 'category'
            }), defaultState['publication']);
        });

        it ('should return default state if action type is LOGOUT OR LINKED_SEARCH for category article)', function () {
            [ LOGOUT, LINKED_SEARCH ]
            .map(type => assert.deepEqual(
                createLimiters('article')(
                    {
                        fullText: false,
                        publicationDate: {
                            from: 2000,
                            to: 2015
                        },
                        peerReviewedArticle: true
                    },
                    { type, category: 'article' }
                ),
                defaultState['article'])
            );
        });

        it ('should return default state if action type is LOGOUT OR LINKED_SEARCH for category publication', function () {
            [ LOGOUT, LINKED_SEARCH ]
            .map(type => assert.deepEqual(
                createLimiters('publication')(
                    {
                        fullText: false,
                        publicationDate: {
                            from: 2000,
                            to: 2015
                        },
                        peerReviewedArticle: true
                    },
                    { type, category: 'publication' }
                ),
                defaultState['publication'])
            );
        });

        it ('should return state unchanged if one was passed', function () {
            assert.deepEqual(categoryLimiters({ state: 'state'}, { type: 'OTHER_ACTION_TYPE', category: 'category' }), {
                state: 'state'
            });
        });
    });

    describe('CHANGE_LIMITER', function () {
        it('should set action.limiter to action.value', function () {
            assert.equal(categoryLimiters({ fullText: true }, {
                type: CHANGE_LIMITER,
                category: 'category',
                limiter: 'fullText',
                value: false
            }).fullText, false);

            const newState = categoryLimiters({
                publicationDate: {
                    from: 1000,
                    to: 2016
                }
            }, {
                type: CHANGE_LIMITER,
                category: 'category',
                limiter: 'publicationDate',
                value: { from: 2000, to: 2012 }
            });
            assert.equal(newState.publicationDate.from, 2000);
            assert.equal(newState.publicationDate.to, 2012);
        });
    });

});
