import {
    A2Z
} from '../../../lib/actions';

const {
    RETRIEVE_SUCCESS,
    SHOW_NOTICE
} = A2Z;
import a2zRecord, { defaultState } from '../../../lib/reducers/a2zRecord';

describe('reducers a2zRecord', function () {

    it('should return default state if none given', function () {
        assert.deepEqual(a2zRecord(undefined, { type: 'OTHER_ACTION_TYPE' }), defaultState);
    });

    it('should add action.response as notice to state if action is A2Z_RETRIEVE_SUCCESS', function () {
        assert.deepEqual(a2zRecord({
            author: 'john doe'
        }, {
            type: RETRIEVE_SUCCESS,
            response: 'notice content'
        }), {
            author: 'john doe',
            notice: 'notice content'
        });
    });

    it('should add action.response as notice to state if action is A2Z_RETRIEVE_SUCCESS', function () {
        assert.deepEqual(a2zRecord({
            author: 'john doe'
        }, {
            type: RETRIEVE_SUCCESS,
            response: 'notice content'
        }), {
            author: 'john doe',
            notice: 'notice content'
        });
    });

    it('should set noticeShown to action.visibility if action is A2Z_SHOW_NOTICE', function () {
        assert.deepEqual(
            a2zRecord({ other: 'data' }, { type: SHOW_NOTICE, visibility: 'visible?', articleIndex: 5 }),
            { noticeShown: 'visible?', other: 'data' }
        );
    });

});
