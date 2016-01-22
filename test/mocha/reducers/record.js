import {
    RETRIEVE_SUCCESS,
    RETRIEVE_LINK_SUCCESS
} from '../../../lib/actions';
import record from '../../../lib/reducers/record';

describe('reducers record', function () {

    it('should default state to empty object if none given', function () {
        assert.deepEqual(record(undefined, { type: 'OTHER_ACTION_TYPE' }), {});
    });

    it('should add action.response as notice to state if action is RETRIEVE_SUCCESS', function () {
        assert.deepEqual(record({
            author: 'john doe'
        }, {
            type: RETRIEVE_SUCCESS,
            response: 'notice content'
        }), {
            author: 'john doe',
            notice: 'notice content'
        });
    });

    it('should set state.articleLink action.response.url if action is RETRIEVE_LINK_SUCCESS', function () {
        assert.deepEqual(record({
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

});
