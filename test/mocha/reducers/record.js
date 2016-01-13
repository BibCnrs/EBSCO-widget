import record from '../../../lib/reducers/record';

describe('reducers record', function () {

    it('should default state to empty object if none given', function () {
        assert.deepEqual(record(undefined, { type: 'OTHER_ACTION_TYPE' }), { notice: { data: [], status: 'NONE' }});
    });

});
