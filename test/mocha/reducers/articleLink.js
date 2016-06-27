import articleLink, * as fromArticleLink from '../../../lib/reducers/articleLink';
import {
    RETRIEVE_LINK_SUCCESS,
    SEARCH_SUCCESS,
    LOGOUT
} from '../../../lib/actions';

describe('reducer articleLink', function () {

    it('should set state[action.id] to action.response.url if action is RETRIEVE_LINK_SUCCESS', function () {
        assert.deepEqual(articleLink({ other: 'state' }, {
            type: RETRIEVE_LINK_SUCCESS,
            id: 64,
            response: { url: 'http://url.com' }
        }), { other: 'state', 64: 'http://url.com' });
    });

    it('should set state[action.response.results[].id] to action.response.results[].articleLink if action type is SEARCH_SUCCESS and category is article', function () {
        assert.deepEqual(articleLink({ other: 'state' }, {
            type: SEARCH_SUCCESS,
            id: 64,
            category: 'article',
            response: {
                results: [
                    { id: 1, articleLink: 'link1' },
                    { id: 2, articleLink: 'link2' },
                    { id: 3, articleLink: 'link3' }
                ]
            }
        }), {
            other: 'state',
            1: 'link1',
            2: 'link2',
            3: 'link3'
        });
    });

    it('should not change state if action type is SEARCH_SUCCESS category category is not article', function () {
        assert.deepEqual(articleLink({ other: 'state' }, {
            type: SEARCH_SUCCESS,
            id: 64,
            category: 'not article',
            response: {
                results: [
                    { id: 1, articleLink: 'link1' },
                    { id: 2, articleLink: 'link2' },
                    { id: 3, articleLink: 'link3' }
                ]
            }
        }), { other: 'state' });
    });

    it('should return defaultState when action type is LOGOUT', function () {
        assert.deepEqual(articleLink({ other: 'state' }, {
            type: LOGOUT
        }), fromArticleLink.defaultState);
    });

    describe('selector', function () {
        describe('getById', function () {
            it('should return articleLink for given id', function () {
                assert.equal(fromArticleLink.getById({ 64: 'link' }, 64), 'link');
            });

            it('should return undefined if no link for id', function () {
                assert.isUndefined(fromArticleLink.getById({ 64: 'link' }, 65));
            });
        });
    });

});
