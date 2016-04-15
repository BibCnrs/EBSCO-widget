import {
    ARTICLE,
    RETRIEVE_LINK_SUCCESS
} from '../../../lib/actions';
import articleRecord, { defaultState } from '../../../lib/reducers/articleRecord';

describe('reducers articleRecord', function () {

    it('should return default state if none given', function () {
        assert.deepEqual(articleRecord(undefined, { type: 'OTHER_ACTION_TYPE' }), defaultState);
    });

    it('should add action.response as notice to state if action is ARTICLE_RETRIEVE_SUCCESS', function () {
        assert.deepEqual(articleRecord({
            author: 'john doe'
        }, {
            type: ARTICLE.RETRIEVE_SUCCESS,
            response: 'notice content'
        }), {
            author: 'john doe',
            notice: 'notice content'
        });
    });

    it('should add action.response as notice to state if action is ARTICLE_RETRIEVE_SUCCESS', function () {
        assert.deepEqual(articleRecord({
            author: 'john doe'
        }, {
            type: ARTICLE.RETRIEVE_SUCCESS,
            response: 'notice content'
        }), {
            author: 'john doe',
            notice: 'notice content'
        });
    });

    it('should set state.articleLink action.response.url if action is RETRIEVE_LINK_SUCCESS', function () {
        assert.deepEqual(articleRecord({
            author: 'john doe'
        }, {
            type: RETRIEVE_LINK_SUCCESS,
            response: {
                url: 'http://linkToArticle.com'
            }
        }), {
            author: 'john doe',
            articleLink: 'http://linkToArticle.com'
        });
    });

    it('should set noticeShown to action.visibility if action is ARTICLE_SHOW_NOTICE', function () {
        assert.deepEqual(
            articleRecord({ other: 'data' }, { type: ARTICLE.SHOW_NOTICE, visibility: 'visible?', articleIndex: 5 }),
            { noticeShown: 'visible?', other: 'data' }
        );
    });

});
