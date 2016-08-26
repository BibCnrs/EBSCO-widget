import { Etc } from '../../../lib/components/Etc';

describe('Etc', function () {
    const getComponent = (list, limit) => enzyme.mount(<Etc list={list} limit={limit} />);

    it('should display list separated with ";"', function () {
        const list = [1, 2, 3, 4, 5];
        const component = getComponent(list, 5);

        const span = component.find('span');
        assert.equal(span.text(), '1; 2; 3; 4; 5');

    });

    it('should display only the <limit> first list element separated with ";" and add a link to display all', function () {
        const list = [1, 2, 3, 4, 5];
        const component = getComponent(list, 2);

        const span = component.find('span');
        assert.equal(span.text(), '1; 2 et 3 autres');
    });

    it('should display only the <limit> first list element separated with ";" and add a link to display all one', function () {
        const list = [1, 2, 3, 4, 5];
        const component = getComponent(list, 4);

        const span = component.find('span');
        assert.equal(span.text(), '1; 2; 3; 4 et 1 autre');
    });

    it('should display all list separated with ";" and add a link to hide those over limit if state.showAll is true', function () {
        const list = [1, 2, 3, 4, 5];
        const component = getComponent(list, 2);
        component.setState({ showAll: true });

        const span = component.find('span');
        assert.equal(span.text(), '1; 2; 3; 4; 5 <<');
    });

});
