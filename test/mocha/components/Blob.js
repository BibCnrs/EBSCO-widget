import Blob from '../../../lib/components/Blob';

describe.only('Blob', function () {
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

    it('should display object with an indice property with <p><sup>indice</sup><span>value</span></p>', function () {
        const data = {
            indice: 'indice',
            lastValue: 'value'
        };
        const component = getComponent(data);
        const p = component.find('p');
        const sup = p.find('sup');
        assert.equal(p.text(), 'indicevalue');
        assert.equal(sup.text(), data.indice);
        const span = p.find('span');
        assert.equal(span.text(), data.lastValue);
    });

    it('should display object with an url property with FullTextHolding', function () {
        const data = {
            url: 'http://google.com',
            name: 'google'
        };
        const component = getComponent(data);
        const fullTextHolding = component.find('FullTextHolding');
        assert.deepEqual(fullTextHolding.props().data, data);
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

    it('should display string with p component', function () {
        const data= 'hello';
        const component = getComponent(data);
        const p = component.find('p');
        assert.equal(p.text(), data);
    });

});
