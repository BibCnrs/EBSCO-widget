import SearchResultWithSidebar from '../../../lib/components/SearchResultWithSidebar';

describe('SearchResultWithSidebar', function () {
    it('render a div instead of a sidebar if resultShown is false', function () {
        const props = {
            resultShown: false,
            limiterShown: true,
            showLimiter: () => null
        };
        const component = enzyme.shallow(<SearchResultWithSidebar {...props} />);
        const sidebar = component.find('Sidebar');
        assert.equal(sidebar.length, 0);
        const div = component.find('div');
        assert.equal(div.length, 1);
    });

    it('render set Sidebar isOpen props to true if limiterShown is true', function () {
        const props = {
            resultShown: true,
            limiterShown: true,
            showLimiter: () => null
        };
        const component = enzyme.shallow(<SearchResultWithSidebar {...props} />);
        const sidebar = component.find('Sidebar');
        assert.equal(sidebar.length, 1);
        assert.equal(sidebar.props().isOpen, true);
        assert.deepEqual(sidebar.props().open, props.showLimiter);
    });

    it('render set Sidebar isOpen props to false if limiterShown is false', function () {
        const props = {
            resultShown: true,
            limiterShown: false,
            showLimiter: () => null
        };
        const component = enzyme.shallow(<SearchResultWithSidebar {...props} />);
        const sidebar = component.find('Sidebar');
        assert.equal(sidebar.length, 1);
        assert.equal(sidebar.props().isOpen, false);
        assert.deepEqual(sidebar.props().open, props.showLimiter);
    });
});
