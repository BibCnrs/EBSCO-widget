'use strict';

import Authentication from '../../../lib/components/Authentication';

describe('Authentication', function () {
    let component;

    describe('event', function () {
        let data, receivedUrl;

        beforeEach(function () {
            data = undefined;
            const onSubmit = (url, d) => (data = d, receivedUrl = url);
            const props = {
                onSubmit,
                'url': '/api',
                login: {
                    status: 'NONE'
                }
            };
            component = TestUtils.renderIntoDocument(React.createElement(Authentication, props));
        });

        it('should be initialised with empty input and disabled submit', function () {
            const { username, password } = component.refs;
            assert.equal(username.getAttribute('value'), '');
            assert.equal(password.getAttribute('value'), '');
        });

        it('should not call onSubmit with default state value if state was not changed when submitting', function () {
            const { username, password } = component.refs;
            username.setAttribute('value', 'john');
            TestUtils.Simulate.change(username, { target: { name: 'username', value: 'john'} });
            assert.deepEqual(component.state, { username: 'john', password: '' });
            password.setAttribute('value', 'secret');
            TestUtils.Simulate.change(username, { target: { name: 'password', value: 'secret'} });
            assert.deepEqual(component.state, { username: 'john', password: 'secret' });

            component.handleSubmit({ preventDefault: () => null});
            assert.deepEqual(data, { username: 'john', password: 'secret' });
            assert.equal(receivedUrl, '/api');
        });

        it('should call onSubmit with state value', function () {
            const state = {
                username: 'john',
                password: 'secret'
            };
            component.setState(state);
            component.handleSubmit({ preventDefault: () => null});
            assert.deepEqual(data, state);
            assert.equal(receivedUrl, '/api');
        });

        it('should set input value with corresponding state value', function () {
            component.setState({
                username: 'john',
                password: 'secret'
            });

            const { username, password } = component.refs;
            assert.equal(username.props.value, 'john');
            assert.equal(password.props.value, 'secret');
        });

    });

});
