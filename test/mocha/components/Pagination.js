import Pagination from '../../../lib/components/Pagination';

describe.only('Pagination', function () {
    let changePageCall;

    const getComponent = (currentPage, maxPage) =>  {
        const props = {
            currentPage,
            maxPage,
            changePage: (value) => {
                changePageCall = value;
            }
        };
        return enzyme.mount(<Pagination {...props}/>);
    };

    beforeEach(function () {
        changePageCall = null;
    });

    describe('normal', function () {
        let component;

        before(function () {
            component = getComponent(5, 10);
        });

        it ('should render pagination', function () {
            const current = component.find('.current').text();
            assert.equal(current, '5/10');
        });

        it('should call changePage with currentPage -1 when clicking previous', function () {
            const previous = component.find('.previous');
            assert.isFalse(previous.props().disabled);
            previous.simulate('click');
            assert.equal(changePageCall, 4);
        });

        it('should call changePage with currentPage +1 when clicking next', function () {
            const next = component.find('.next');
            assert.isFalse(next.props().disabled);
            next.simulate('click');
            assert.equal(changePageCall, 6);
        });
    });

    describe('first page', function () {
        let component;

        before(function () {
            component = getComponent(1, 10);
        });

        it ('should render pagination', function () {
            const current = component.find('.current').text();
            assert.equal(current, '1/10');
        });

        it('should call changePage with currentPage -1 when clicking previous', function () {
            const previous = component.find('.previous');
            assert.isTrue(previous.props().disabled);
            previous.simulate('click');
            assert.isNull(changePageCall);
        });

        it('should call changePage with currentPage +1 when clicking next', function () {
            const next = component.find('.next');
            assert.isFalse(next.props().disabled);
            next.simulate('click');
            assert.equal(changePageCall, 2);
        });
    });

    describe('last page', function () {
        let component;

        before(function () {
            component = getComponent(10, 10);
        });

        it ('should render pagination', function () {
            const current = component.find('.current').text();
            assert.equal(current, '10/10');
        });

        it('should call changePage with currentPage -1 when clicking previous', function () {
            const previous = component.find('.previous');
            assert.isFalse(previous.props().disabled);
            previous.simulate('click');
            assert.equal(changePageCall, 9);
        });

        it('should call changePage with currentPage +1 when clicking next', function () {
            const next = component.find('.next');
            assert.isTrue(next.props().disabled);
            next.simulate('click');
            assert.isNull(changePageCall);
        });
    });
});
