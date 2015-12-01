import { Map } from 'immutable';
import result from '../../../lib/reducers/result';
import { SHOW_ABSTRACT } from '../../../lib/actions';

describe('reducers result', function () {

    it('should default state to empty object if none given', function () {
        assert.deepEqual(result(undefined, Map({ type: 'OTHER_ACTION_TYPE' })).toJS(), { notice: { data: [], status: 'NONE' }});
    });

    it('should return object with abstractShown property if action.type is SHOW_ABSTRACT and state is undefined', function () {
        assert.deepEqual(result(undefined, { type: SHOW_ABSTRACT, visibility: true }).toJS(), { abstractShown: true, notice: { data: [], status: 'NONE' } });
        assert.deepEqual(result(undefined, { type: SHOW_ABSTRACT, visibility: false }).toJS(), { abstractShown: false, notice: { data: [], status: 'NONE' } });
    });

    it('should return state whith added abstractShown if action.type is SHOW_ABSTRACT', function () {
        const resultItem = Map({ name: 'result', property: 'whatever', notice: Map() });
        assert.deepEqual(result(resultItem, { type: SHOW_ABSTRACT, visibility: true }), resultItem.set('abstractShown', true));
        assert.deepEqual(result(resultItem, { type: SHOW_ABSTRACT, visibility: false }), resultItem.set('abstractShown', false));
    });

});
