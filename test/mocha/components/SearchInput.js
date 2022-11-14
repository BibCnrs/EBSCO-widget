import { SearchInput } from '../../../lib/components/SearchInput';

describe('SearchInput component', function() {
    let component, props;

    const getComponent = props => enzyme.shallow(<SearchInput {...props} />);

    beforeEach(function() {
        props = {
            onSearch: function onSearch() {
                return ['onSearch', ...arguments];
            },
            onChange: function onSearch() {
                return ['onChange', ...arguments];
            },
            clearAutocomplete: function onSearch() {
                return ['clearAutocomplete', ...arguments];
            },
            status: 'NONE',
            value: 'word',
            text: {
                search: 'Search',
            },
            placeholder: 'Search',
        };

        component = getComponent(props);
    });

    it('should have a search button with disabled at true if term is falsy false otherwise', function() {
        let fetchButton = component.find('.search-fetch button');

        assert.isFalse(fetchButton.props().disabled);

        props.value = '';
        component = getComponent(props);
        fetchButton = component.find('.search-fetch button');
        assert.isTrue(fetchButton.props().disabled);
    });

    it('should have a search button with onClick calling onSearch', function() {
        const fetchButton = component.find('.search-fetch button');
        const { onClick } = fetchButton.props();
        assert.deepEqual(onClick(), ['onSearch']);
        assert.isFalse(fetchButton.props().disabled);
    });
});
