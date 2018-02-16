import mountSelectors from '../../../lib/services/mountSelectors';

describe('mountSelectors', function() {
    it('should return mountedSelectors', function() {
        let get1Call, get2Call;

        const selectors = {
            get1: (...args) => (get1Call = args),
            get2: (...args) => (get2Call = args),
        };

        const mountedSelectors = mountSelectors('subStateKey', selectors);

        assert.deepEqual(Object.keys(mountedSelectors), ['get1', 'get2']);

        mountedSelectors.get1(
            { subStateKey: 'subState' },
            'additional',
            'arguments',
        );

        assert.deepEqual(get1Call, ['subState', 'additional', 'arguments']);
        assert.isUndefined(get2Call);
    });

    it('should discard selectors that are not function', function() {
        const selectors = {
            get1: () => null,
            get2: () => null,
            data: 'value',
        };

        const mountedSelectors = mountSelectors('subStateKey', selectors);

        assert.deepEqual(Object.keys(mountedSelectors), ['get1', 'get2']);
    });
});
