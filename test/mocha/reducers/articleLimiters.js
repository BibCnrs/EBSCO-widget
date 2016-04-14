import articleLimiters from '../../../lib/reducers/articleLimiters';
import {
    ARTICLE,
    LOGOUT
} from '../../../lib/actions';

describe('reducers articleLimiters', function () {

    describe('default action', function () {

        it ('should default state to default limiter value', function () {
            assert.deepEqual(articleLimiters(undefined, { type: 'OTHER_ACTION_TYPE' }), {
                fullText: true,
                publicationDate: {
                    from: null,
                    to: null
                },
                peerReviewedArticle: false
            });
        });

        it ('should return default state if action type is LOGOUT', function () {
            assert.deepEqual(
                articleLimiters(
                    {
                        fullText: false,
                        publicationDate: {
                            from: 2000,
                            to: 2015
                        },
                        peerReviewedArticle: true
                    },
                    { type: LOGOUT }
                ),
                {
                    fullText: true,
                    publicationDate: {
                        from: null,
                        to: null
                    },
                    peerReviewedArticle: false
                });
        });

        it ('should return state unchanged if one was passed', function () {
            assert.deepEqual(articleLimiters({ state: 'state'}, { type: 'OTHER_ACTION_TYPE' }), {
                state: 'state'
            });
        });
    });

    describe('ARTICLE_CHANGE_LIMITER', function () {
        it('should set action.limiter to action.value', function () {
            assert.equal(articleLimiters({ fullText: true }, { type: ARTICLE.CHANGE_LIMITER, limiter: 'fullText', value: false }).fullText, false);
            const newState = articleLimiters({
                publicationDate: {
                    from: 1000,
                    to: 2016
                }
            }, {
                type: ARTICLE.CHANGE_LIMITER,
                limiter: 'publicationDate',
                value: { from: 2000, to: 2012 }
            });
            assert.equal(newState.publicationDate.from, 2000);
            assert.equal(newState.publicationDate.to, 2012);
        });
    });

});
