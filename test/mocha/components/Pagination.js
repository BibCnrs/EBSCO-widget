import Pagination from '../../../lib/components/Pagination';

describe('Pagination', function () {
    let changePageCall, loadPageCall;

    const getComponent = (currentPage, maxPage, targetPage = currentPage) =>  {
        const props = {
            currentPage,
            targetPage,
            maxPage,
            changePage: (value) => {
                changePageCall = value;
            },
            loadPage: (value) => {
                loadPageCall = value;
            }
        };
        return enzyme.mount(<Pagination {...props}/>);
    };

    beforeEach(function () {
        changePageCall = null;
        loadPageCall = null;
    });

    describe('normal', function () {
        let component;

        before(function () {
            component = getComponent(5, 10);
        });

        it('should render pagination', function () {
            const current = component.find('.current');
            assert.equal(current.text(), '/10');
            const input = current.find('input');
            assert.equal(input.props().value, 5);
        });

        it('should call changePage with entered value when editing input', function () {
            const input = component.find('input');
            input.simulate('change', { target: { value: 7 } });
            assert.equal(changePageCall, 7);
        });

        it('should call loadPage with input value when pressing enter on input', function () {
            const input = component.find('input');
            input.simulate('change', { target: { value: 7 } });
            input.simulate('keyPress', { key: 'Enter' });
            assert.equal(changePageCall, 7);
        });

        it('should call loadPage with input value when bluring input', function () {
            const input = component.find('input');
            input.simulate('change', { target: { value: 7 } });
            input.simulate('blur', { target: { value: 7 } });
            assert.equal(changePageCall, 7);
        });

        it('should call loadPage with currentPage -1 when clicking previous', function () {
            const previous = component.find('.previous');
            previous.simulate('click');
            assert.equal(loadPageCall, 4);
        });

        it('should call loadPage with currentPage +1 when clicking next', function () {
            const next = component.find('.next');
            next.simulate('click');
            assert.equal(loadPageCall, 6);
        });
    });

    describe('when on first page', function () {
        let component;

        before(function () {
            component = getComponent(1, 10);
        });

        it ('should render pagination', function () {
            const current = component.find('.current');
            assert.equal(current.text(), '/10');
            const input = current.find('input');
            assert.equal(input.props().value, 1);
        });

        it('should not call loadPage when clicking previous', function () {
            const previous = component.find('.previous');
            previous.simulate('click');
            assert.isNull(loadPageCall);
        });

        it('should call loadPage with currentPage +1 when clicking next', function () {
            const next = component.find('.next');
            next.simulate('click');
            assert.equal(loadPageCall, 2);
        });

    });

    describe('when on last page', function () {
        let component;

        before(function () {
            component = getComponent(10, 10);
        });

        it ('should render pagination', function () {
            const current = component.find('.current');
            assert.equal(current.text(), '/10');
            const input = current.find('input');
            assert.equal(input.props().value, 10);
        });

        it('should call loadPage with currentPage -1 when clicking previous', function () {
            const previous = component.find('.previous');
            previous.simulate('click');
            assert.equal(loadPageCall, 9);
        });

        it('should not call loadPage when clicking next', function () {
            const next = component.find('.next');
            next.simulate('click');
            assert.isNull(loadPageCall);
        });

    });
});
