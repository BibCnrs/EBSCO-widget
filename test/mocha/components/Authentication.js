import Authentication from '../../../lib/components/Authentication';

describe('Authentication', function () {
    let component, data;

    beforeEach(function () {
        data = undefined;
        const onSubmit = (d) => (data = d);
        const props = {
            onSubmit,
            'url': '/api',
            login: {
                status: 'NONE'
            }
        };
        component = enzyme.mount(<Authentication {...props} />);
    });

    it('should call onSubmit with input values', function () {
        const {username, password} = component.node;
        username.value = 'john';
        password.value = 'secret';
        component.find('button').simulate('click');
        assert.deepEqual(data, {
            username: 'john',
            password: 'secret'
        });
    });
});
