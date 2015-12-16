import { Map } from 'immutable';
import record from '../../../lib/reducers/record';
import { SHOW_ABSTRACT } from '../../../lib/actions';

describe('reducers record', function () {

    it('should default state to empty object if none given', function () {
        assert.deepEqual(record(undefined, Map({ type: 'OTHER_ACTION_TYPE' })).toJS(), { notice: { data: [], status: 'NONE' }});
    });

    it('should return object with abstractShown property if action.type is SHOW_ABSTRACT and state is undefined', function () {
        assert.deepEqual(record(undefined, { type: SHOW_ABSTRACT, visibility: true }).toJS(), { abstractShown: true, notice: { data: [], status: 'NONE' } });
        assert.deepEqual(record(undefined, { type: SHOW_ABSTRACT, visibility: false }).toJS(), { abstractShown: false, notice: { data: [], status: 'NONE' } });
    });

    it('should return state whith added abstractShown if action.type is SHOW_ABSTRACT', function () {
        const recordItem = Map({ name: 'record', property: 'whatever', notice: Map() });
        assert.deepEqual(record(recordItem, { type: SHOW_ABSTRACT, visibility: true }), recordItem.set('abstractShown', true));
        assert.deepEqual(record(recordItem, { type: SHOW_ABSTRACT, visibility: false }), recordItem.set('abstractShown', false));
    });

});
