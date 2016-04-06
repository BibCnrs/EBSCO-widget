import Authentication from '../../../lib/components/Authentication';

describe('Authentication', function () {
    let component, onSubmitCall;

    beforeEach(function () {
        onSubmitCall = undefined;
        const onSubmit = (url, data) => (onSubmitCall = { url, data });
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
        assert.deepEqual(onSubmitCall, {
            url: '/api',
            data: {
                username: 'john',
                password: 'secret'
            }
        });
    });
});
