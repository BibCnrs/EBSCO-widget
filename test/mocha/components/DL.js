import DL from '../../../lib/components/DL';

describe('DL', function () {
    const getComponent = (data) => enzyme.shallow(<DL data={data} />);

    it('should display object as definition list like this (<dl><dt>key></dt><dd><Blob data={value}/></dd></dl>)', function () {
        const data = {
            a: '1',
            b: '2'
        };
        const component = getComponent(data);
        const keys = component.find('dt');
        assert.deepEqual(keys.map((key) => key.text()), Object.keys(data));
        const values = component.find('dd');
        assert.deepEqual(values.map((value) => {
            const blob = value.find('Blob');
            return blob.props().data;
        }), Object.keys(data).map(key => data[key]));
    });


    it('should ignore undefined value', function () {
        const component = getComponent({
            a: '1',
            b: undefined
        });
        const keys = component.find('dt');
        assert.deepEqual(keys.map((key) => key.text()), ['a']);
        const values = component.find('dd');
        assert.deepEqual(values.map((key) => key.find('Blob').props().data), ['1']);
    });

    it('should ignore null value', function () {
        const component = getComponent({
            a: '1',
            b: null
        });
        const keys = component.find('dt');
        assert.deepEqual(keys.map((key) => key.text()), ['a']);
        const values = component.find('dd');
        assert.deepEqual(values.map((key) => key.find('Blob').props().data), ['1']);
    });

    it('should ignore empty string value', function () {
        const component = getComponent({
            a: '1',
            b: ''
        });
        const keys = component.find('dt');
        assert.deepEqual(keys.map((key) => key.text()), ['a']);
        const values = component.find('dd');
        assert.deepEqual(values.map((key) => key.find('Blob').props().data), ['1']);
    });

});
