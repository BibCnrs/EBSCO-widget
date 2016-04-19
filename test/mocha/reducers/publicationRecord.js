import {
    PUBLICATION
} from '../../../lib/actions';
import publicationRecord, { defaultState } from '../../../lib/reducers/publicationRecord';

describe('reducers publicationRecord', function () {

    it('should return default state if none given', function () {
        assert.deepEqual(publicationRecord(undefined, { type: 'OTHER_ACTION_TYPE' }), defaultState);
    });

    it('should add action.response as notice to state if action is PUBLICATION_RETRIEVE_SUCCESS', function () {
        assert.deepEqual(publicationRecord({
            author: 'john doe'
        }, {
            type: PUBLICATION.RETRIEVE_SUCCESS,
            response: 'notice content'
        }), {
            author: 'john doe',
            notice: 'notice content'
        });
    });

    it('should add action.response as notice to state if action is PUBLICATION_RETRIEVE_SUCCESS', function () {
        assert.deepEqual(publicationRecord({
            author: 'john doe'
        }, {
            type: PUBLICATION.RETRIEVE_SUCCESS,
            response: 'notice content'
        }), {
            author: 'john doe',
            notice: 'notice content'
        });
    });

    it('should set noticeShown to action.visibility if action is PUBLICATION_SHOW_NOTICE', function () {
        assert.deepEqual(
            publicationRecord({ other: 'data' }, { type: PUBLICATION.SHOW_NOTICE, visibility: 'visible?', publicationIndex: 5 }),
            { noticeShown: 'visible?', other: 'data' }
        );
    });

});
