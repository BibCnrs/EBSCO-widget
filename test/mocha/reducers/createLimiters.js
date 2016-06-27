import createLimiters, * as fromLimiters from '../../../lib/reducers/createLimiters';
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
            }), fromLimiters.defaultState['article']);

            assert.deepEqual(createLimiters('publication')(undefined, {
                type: 'OTHER_ACTION_TYPE',
                category: 'category'
            }), fromLimiters.defaultState['publication']);
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
                fromLimiters.defaultState['article'])
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
                fromLimiters.defaultState['publication'])
            );
        });

        it ('should return state unchanged if one was passed', function () {
            assert.deepEqual(categoryLimiters({ state: 'state'}, { type: 'OTHER_ACTION_TYPE', category: 'category' }), {
                state: 'state'
            });
        });
    });

    it('should set action.limiter to action.value when action is CHANGE_LIMITER', function () {
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

    describe('selector', function () {

        describe('getValueByName', function () {
            it('should return value for the given limiter name', function () {
                assert.equal(fromLimiters.getValueByName({ name: 'value'}, 'name'), 'value');
            });
        });
    });

});
