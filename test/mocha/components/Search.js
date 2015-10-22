'use strict';

import Icon from 'react-fa';
import Search from '../../../lib/components/Search';

describe('Search', function () {
    let component;

    describe('props.state={status: NONE}', function () {
        before(function () {
            const onClick = function onClick() {};
            const onChange = function onClick() {};
            const shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<Search onClick={onClick} onChange={onChange} search={{ term: 'word', status: 'NONE' }} />);

            component = shallowRenderer.getRenderOutput();
        });

        it ('should display input with button and search icon', function () {
            assert.equal(component.type, 'div');
            const children = component.props.children;
            assert.equal(children.length, 3);
            const [ input, button, error ] = children;
            assert.equal(input.type, 'input');
            assert.equal(input.props.type, 'text');
            assert.equal(button.type, 'button');
            assert.isFalse(button.props.disabled);
            const [icon] = button.props.children;
            assert.equal(icon.type, Icon);
            assert.equal(icon.props.name, 'search');
            assert.isNull(error);
        });
    });

    describe('props.state={status: PENDING}', function () {
        before(function () {
            const onClick = function onClick() {};
            const onChange = function onChange() {};
            const shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<Search onClick={onClick} onChange={onChange} search={{ status: 'PENDING' }} />);

            shallowRenderer.state = { term: 'search' };

            component = shallowRenderer.getRenderOutput();
        });

        it ('should disable search and display spinner if props.state is PENDING', function () {
            assert.equal(component.type, 'div');
            const children = component.props.children;
            assert.equal(children.length, 3);
            const [ input, button, error ] = children;
            assert.equal(input.type, 'input');
            assert.equal(input.props.type, 'text');
            assert.equal(button.type, 'button');
            assert.isTrue(button.props.disabled);
            const [icon] = button.props.children;
            assert.equal(icon.type, Icon);
            assert.equal(icon.props.name, 'spinner');
            assert.isTrue(icon.props.spin);
            assert.isNull(error);
        });
    });

    describe('props.state={status: ERROR}', function () {
        before(function () {
            const onClick = function onClick() {};
            const onChange = function onChange() {};
            const shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<Search onClick={onClick} onChange={onChange} search={{ term: 't', status: 'ERROR', error: 'boom' }} />);

            shallowRenderer.state = { term: 'search' };

            component = shallowRenderer.getRenderOutput();
        });

        it ('should display error', function () {
            assert.equal(component.type, 'div');
            const children = component.props.children;
            assert.equal(children.length, 3);
            const [ input, button, error ] = children;
            assert.equal(input.type, 'input');
            assert.equal(input.props.type, 'text');
            assert.equal(button.type, 'button');
            assert.isFalse(button.props.disabled);
            const [icon] = button.props.children;
            assert.equal(icon.type, Icon);
            assert.equal(icon.props.name, 'search');
            assert.equal(error.type, 'p');
            const [errorIcon, , message ] = error.props.children;

            assert.equal(errorIcon.type, Icon);
            assert.equal(errorIcon.props.name, 'exclamation-triangle');
            assert.equal(message, 'boom');
        });
    });

    describe('event', function () {
        let term;

        before(function () {
            const onClick = (t) => (term = t);
            const onChange = (t) => (term = t);
            const props = {
                onClick,
                onChange,
                search: { term: 'searched term', status: 'NONE' }
            };
            component = TestUtils.renderIntoDocument(React.createElement(Search, props));
        });

        describe('handleClick', function () {

            it('should call onClick with state.term value', function () {
                component.handleClick();
                assert.equal(term, 'searched term');
            });
        });

        describe('handleChange', function () {

            beforeEach(function () {
                component.handleChange({ target: { value: 'searched term'}});
            });

            it('should set term to onChange event.target.value', function () {
                assert.equal(term, 'searched term');
            });

            it('should set input value to onChange event.target.value', function () {
                const inputNode = TestUtils.findRenderedDOMComponentWithTag(component, 'input').getDOMNode();
                assert.equal(inputNode.value, 'searched term');
            });
        });
    });

});
