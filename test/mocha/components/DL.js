import DL from '../../../lib/components/DL';

describe.only('DL', function () {
    const getComponent = (data) => enzyme.shallow(<DL data={data} />);

    it('should display object as definition list', function () {
        const data = {
            a: '1',
            b: '2'
        };
        const component = getComponent(data);
        const keys = component.find('dt');
        assert.deepEqual(keys.map((key) => key.text()), Object.keys(data));
        const values = component.find('dd');
        assert.deepEqual(values.map((key) => key.text()), Object.keys(data).map(key => data[key]));
    });

    it('should replace true boolean value with check icon', function () {
        const component = getComponent({
            true: true
        });
        const keys = component.find('dt');
        assert.deepEqual(keys.map((key) => key.text()), ['true']);
        const values = component.find('dd');
        assert.deepEqual(values.map((key) => key.text()), ['<Icon />']);
        const icon = values.find('Icon');
        assert.equal(icon.props().name, 'check');
    });

    it('should replace false boolean value with close icon', function () {
        const component = getComponent({
            false: false
        });
        const keys = component.find('dt');
        assert.deepEqual(keys.map((key) => key.text()), ['false']);
        const values = component.find('dd');
        assert.deepEqual(values.map((key) => key.text()), ['<Icon />']);
        const icon = values.find('Icon');
        assert.equal(icon.props().name, 'close');
    });

    it('should replace object value with a nested DL', function () {
        const component = getComponent({
            nested: { a: 1 }
        });
        const keys = component.find('dt');
        assert.deepEqual(keys.map((key) => key.text()), ['nested']);
        const values = component.find('dd');
        assert.deepEqual(values.map((key) => key.text()), ['<DL />']);
        const icon = values.find('DL');
        assert.deepEqual(icon.props().data, { a: 1 });
    });

    it('should ignore undefined value', function () {
        const component = getComponent({
            a: '1',
            b: undefined
        });
        const keys = component.find('dt');
        assert.deepEqual(keys.map((key) => key.text()), ['a']);
        const values = component.find('dd');
        assert.deepEqual(values.map((key) => key.text()), ['1']);
    });

    it('should ignore null value', function () {
        const component = getComponent({
            a: '1',
            b: null
        });
        const keys = component.find('dt');
        assert.deepEqual(keys.map((key) => key.text()), ['a']);
        const values = component.find('dd');
        assert.deepEqual(values.map((key) => key.text()), ['1']);
    });

    it('should ignore empty string value', function () {
        const component = getComponent({
            a: '1',
            b: ''
        });
        const keys = component.find('dt');
        assert.deepEqual(keys.map((key) => key.text()), ['a']);
        const values = component.find('dd');
        assert.deepEqual(values.map((key) => key.text()), ['1']);
    });

});
