import { Search } from '../../../lib/components/Search';

describe('Search component', function () {
    let component, props;

    function getComponent(props) {
        return enzyme.shallow(<Search {...props} />);
    }

    beforeEach(function () {
        props = {
            onSearch: function onSearch() {
                return ['onSearch', ...arguments];
            },
            status: 'NONE',
            term: 'word',
            SearchInput: () => <div/>
        };

        component = getComponent(props);
    });

    it('should have a FetchButton component with disabled at true if term is falsy false otherwise', function () {
        let fetchButton = component.find('FetchButton');

        assert.isFalse(fetchButton.props().disabled);

        props.term = '';
        component = getComponent(props);
        fetchButton = component.find('FetchButton');
        assert.isTrue(fetchButton.props().disabled);
    });

    it('should have a FetchButton component with onClick calling onSearch', function () {
        const fetchButton = component.find('FetchButton');
        const { onClick } = fetchButton.props();
        assert.deepEqual(onClick(), ['onSearch']);
        assert.isFalse(fetchButton.props().disabled);

    });
});
