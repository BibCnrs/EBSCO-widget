import BibSidebar from '../../../lib/components/BibSidebar';

describe('BibSidebar', function () {
    it('render a div instead of a sidebar if resultShown is false', function () {
        const props = {
            mainContent: <div>main content</div>,
            sidebarContent: <div>sidebarContent content</div>,
            resultShown: false,
            limiterShown: true,
            showSidebar: () => null
        };
        const component = enzyme.shallow(<BibSidebar {...props} />);
        const sidebar = component.find('Sidebar');
        assert.equal(sidebar.length, 0);
        const div = component.find('div');
        assert.equal(div.length, 1);
    });

    it('render set Sidebar isOpen props to true if limiterShown is true', function () {
        const props = {
            mainContent: <div>main content</div>,
            sidebarContent: <div>sidebarContent content</div>,
            resultShown: true,
            limiterShown: true,
            showSidebar: () => null
        };
        const component = enzyme.shallow(<BibSidebar {...props} />);
        const sidebar = component.find('Sidebar');
        assert.equal(sidebar.length, 1);
        assert.equal(sidebar.props().isOpen, true);
        assert.deepEqual(sidebar.props().open, props.showSidebar);
    });

    it('render set Sidebar isOpen props to false if limiterShown is false', function () {
        const props = {
            mainContent: <div>main content</div>,
            sidebarContent: <div>sidebarContent content</div>,
            resultShown: true,
            limiterShown: false,
            showSidebar: () => null
        };
        const component = enzyme.shallow(<BibSidebar {...props} />);
        const sidebar = component.find('Sidebar');
        assert.equal(sidebar.length, 1);
        assert.equal(sidebar.props().isOpen, false);
        assert.deepEqual(sidebar.props().open, props.showSidebar);
    });
});
