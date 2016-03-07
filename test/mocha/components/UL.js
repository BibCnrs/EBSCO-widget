import UL from '../../../lib/components/UL';

describe('UL', function () {
    const getComponent = (data) => enzyme.shallow(<UL data={data} />);

    it('should display object as unordered list like this (<ul><li><Blob data={value}/></li></ul>)', function () {
        const data = [1, 2, 3];
        const component = getComponent(data);
        const values = component.find('li');
        assert.deepEqual(values.map((value) => {
            const blob = value.find('Blob');
            return blob.props().data;
        }), Object.keys(data).map(key => data[key]));
    });


    it('should ignore undefined value', function () {
        const component = getComponent([1, undefined, 3]);
        const values = component.find('li');
        assert.deepEqual(values.map((key) => key.find('Blob').props().data), [1, 3]);
    });

    it('should ignore null value', function () {
        const component = getComponent([1, null, 3]);
        const values = component.find('li');
        assert.deepEqual(values.map((key) => key.find('Blob').props().data), [1, 3]);
    });

    it('should ignore empty string value', function () {
        const component = getComponent([1, '', 3]);
        const values = component.find('li');
        assert.deepEqual(values.map((key) => key.find('Blob').props().data), [1, 3]);
    });

});
