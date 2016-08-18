import createLimiters, * as fromLimiters from '../../../lib/reducers/createLimiters';
import {
    CHANGE_LIMITER,
    LINKED_SEARCH,
    RELOAD_HISTORY,
    RESTORE_HISTORY,
    LOGOUT
} from '../../../lib/actions';

describe('reducers createLimiters', function () {
    let categoryLimiters;
    const defaultState = {
        value: 'default state'
    };

    before(function () {
        categoryLimiters = createLimiters('category', defaultState);
    });

    describe('default action', function () {

        it ('should default state to default limiter value', function () {
            assert.deepEqual(createLimiters('article', { value: 'default article state' })(undefined, {
                type: 'OTHER_ACTION_TYPE',
                category: 'category'
            }), { value: 'default article state' });

            assert.deepEqual(createLimiters('publication', { value: 'default publication state' })(undefined, {
                type: 'OTHER_ACTION_TYPE',
                category: 'category'
            }), { value: 'default publication state' });
        });

        it ('should return default state if action type is LOGOUT OR LINKED_SEARCH', function () {
            [ LOGOUT, LINKED_SEARCH ]
            .map(type => assert.deepEqual(
                createLimiters('article', { value: 'default state' })(
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
                { value: 'default state' })
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

    it('should set state to action.query.limiters if action is RELOAD_HISTORY', function () {
        const queryListState = categoryLimiters({},
            { type: RELOAD_HISTORY, category: 'category', query: { limiters: 'limiter content' } }
        );
        assert.equal(queryListState, 'limiter content');
    });

    it('should set state to action.query.limiters if action is RESTORE_HISTORY', function () {
        const queryListState = categoryLimiters({},
            { type: RESTORE_HISTORY, category: 'category', query: { limiters: 'limiter content' } }
        );
        assert.equal(queryListState, 'limiter content');
    });

    describe('selector', function () {

        describe('getValueByName', function () {
            it('should return value for the given limiter name', function () {
                assert.equal(fromLimiters.getValueByName({ name: 'value'}, 'name'), 'value');
            });
        });
    });

});
