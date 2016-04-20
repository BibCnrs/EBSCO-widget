import { Search } from '../../../lib/components/Search';

describe('Search component', function () {
    let component, props;

    function getComponent(props) {
        return enzyme.shallow(<Search {...props} />);
    }

    beforeEach(function () {
        props = {
            onSearchTerm: function onSearchTerm() {
                return ['onSearchTerm', ...arguments];
            },
            status: 'NONE',
            term: 'word',
            domain: 'vie',
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

    it('should have a FetchButton component with onClick calling onSearchTerm with term and domain', function () {
        const fetchButton = component.find('FetchButton');
        const { onClick } = fetchButton.props();
        assert.deepEqual(onClick(), ['onSearchTerm', 'word', 'vie']);
        assert.isFalse(fetchButton.props().disabled);

    });

    it('should have a FetchButton component with passed status and error props', function () {
        props.error = 'error';
        props.status = 'status';
        component = getComponent(props);
        const fetchButton = component.find('FetchButton');
        const { status, error } = fetchButton.props();
        assert.equal(status, 'status');
        assert.equal(error, 'error');

    });
});
