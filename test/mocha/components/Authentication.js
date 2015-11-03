'use strict';

import Authentication from '../../../lib/containers/Authentication';

describe('Authentication', function () {
    let component;

    describe('event', function () {
        let data;

        beforeEach(function () {
            data = undefined;
            const onSubmit = (d) => (data = d);
            const props = {
                onSubmit,
                login: {
                    status: 'NONE'
                }
            };
            component = TestUtils.renderIntoDocument(React.createElement(Authentication, props));
        });

        it ('should be initialised with empty input and disabled submit', function () {
            const { username, password, submit } = component.refs;
            assert.equal(username.props.value, '');
            assert.equal(password.props.value, '');
            assert.isTrue(submit.props.disabled);
        });

        it('should not call onSubmit with default state value if state was not changed when submitting', function () {
            const { username, password } = component.refs;
            username.props.value = 'john';
            TestUtils.Simulate.change(username, { target: { name: 'username', value: 'john'} });
            assert.deepEqual(component.state, { username: 'john', password: '' });
            password.props.value = 'secret';
            TestUtils.Simulate.change(username, { target: { name: 'password', value: 'secret'} });
            assert.deepEqual(component.state, { username: 'john', password: 'secret' });

            component.handleSubmit({ preventDefault: () => null});
            assert.deepEqual(data, { username: 'john', password: 'secret' });
        });

        it('should call onSubmit with state value', function () {
            const state = {
                username: 'john',
                password: 'secret'
            };
            component.setState(state);
            component.handleSubmit({ preventDefault: () => null});
            assert.deepEqual(data, state);
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
