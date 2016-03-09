import Blob from '../../../lib/components/Blob';

describe('Blob', function () {
    const getComponent = (data) => enzyme.shallow(<Blob data={data} />);

    it('should display object with DL component', function () {
        const data = {
            a: '1',
            b: '2'
        };
        const component = getComponent(data);
        const dl = component.find('DL');
        assert.deepEqual(dl.props().data, data);
    });

    it('should display object with an indice property with <sup>indice</sup>', function () {
        const data = {
            indice: 'indice'
        };
        const component = getComponent(data);
        const sup = component.find('sup');
        assert.equal(sup.text(), data.indice);
    });

    it('should display object with url  and name property with FullTextHolding', function () {
        const data = {
            url: 'http://google.com',
            name: 'google'
        };
        const component = getComponent(data);
        const fullTextHolding = component.find('FullTextHolding');
        assert.deepEqual(fullTextHolding.props(), data);
    });

    it('should display object with term, field and value property with SearchableLink', function () {
        const data = {
            term: 'a term',
            value: 'a value',
            field: 'a field'
        };
        const component = getComponent(data);
        const searchLink = component.find('Connect');
        assert.equal(searchLink.node.type.displayName, 'Connect(SearchLink)');
        assert.deepEqual(searchLink.props(), data);
    });

    it('should display true boolean with check Icon', function () {
        const component = getComponent(true);
        const icon = component.find('Icon');
        assert.equal(icon.props().name, 'check');
    });

    it('should display false boolean with close Icon', function () {
        const component = getComponent(false);
        const icon = component.find('Icon');
        assert.equal(icon.props().name, 'close');
    });

    it('should display array with UL component', function () {
        const data = [1, 2, 3];
        const component = getComponent(data);
        const ul = component.find('UL');
        assert.deepEqual(ul.props().data, data);
    });

    it('should display string with span component', function () {
        const data= 'hello';
        const component = getComponent(data);
        const span = component.find('span');
        assert.equal(span.text(), data);
    });

});
