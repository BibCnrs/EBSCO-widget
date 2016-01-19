import Pagination from '../../../lib/components/Pagination';

describe('Pagination', function () {
    let loadPageCall;

    const getComponent = (currentPage, maxPage) =>  {
        const props = {
            currentPage,
            maxPage,
            loadPage: (value) => {
                loadPageCall = value;
            }
        };
        return enzyme.mount(<Pagination {...props}/>);
    };

    beforeEach(function () {
        loadPageCall = null;
    });

    describe('normal', function () {
        let component;

        before(function () {
            component = getComponent(5, 10);
        });

        it('should render pagination', function () {
            const pages = component.find('.page').map((page) => page.text());
            assert.deepEqual(pages, ['1', '2', '3', '4', '5']);
            const currentPage = component.find('.page.current');
            assert.equal(currentPage.text(), 5);
        });

        it('should call loadPage with link label when clicking on a page', function () {
            const page4 = component.find('.page').at(3);
            assert.equal(page4.text(), 4);
            page4.simulate('click');
            assert.equal(loadPageCall, 4);
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
            component = getComponent(1, 5);
        });

        it ('should render pagination', function () {
            const current = component.find('.current');
            assert.equal(current.text(), '1');
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

    describe('when limited by maxPage', function () {
        let component;

        before(function () {
            component = getComponent(2, 3);
        });

        it('should render pagination', function () {
            const pages = component.find('.page').map((page) => page.text());
            assert.deepEqual(pages, ['1', '2', '3']);
            const currentPage = component.find('.page.current');
            assert.equal(currentPage.text(), 2);
        });

        it('should call loadPage with currentPage -1 when clicking previous', function () {
            const previous = component.find('.previous');
            previous.simulate('click');
            assert.equal(loadPageCall, 1);
        });

        it('should call loadPage with currentPage +1 when clicking next', function () {
            const next = component.find('.next');
            next.simulate('click');
            assert.equal(loadPageCall, 3);
        });

    });

    describe('when on last page', function () {
        let component;

        before(function () {
            component = getComponent(5, 5);
        });

        it ('should render pagination', function () {
            const current = component.find('.current');
            assert.equal(current.text(), '5');
        });

        it('should call loadPage whith currentPage -1 when clicking previous', function () {
            const previous = component.find('.previous');
            previous.simulate('click');
            assert.equal(loadPageCall, 4);
        });

        it('should call not loadPage when clicking next', function () {
            const next = component.find('.next');
            next.simulate('click');
            assert.isNull(loadPageCall);
        });

    });

});
